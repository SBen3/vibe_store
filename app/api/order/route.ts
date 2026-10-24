import { NextResponse } from "next/server";
import { computeTotals, normalizePhone, validateOrder, type OrderInput } from "@/lib/order";
import { getProduct } from "@/lib/products";
import { getWilaya } from "@/lib/wilayas";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Partial<OrderInput> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "طلب غير صالح." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (body.website) return NextResponse.json({ ok: true, ref: "CMD-OK" });

  const product = getProduct(String(body.productSlug));
  const errors = validateOrder(body, product);
  if (!product || Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Never trust prices from the browser: recompute from the catalogue.
  const o = body as OrderInput;
  const wilaya = getWilaya(Number(o.wilayaCode))!;
  const totals = computeTotals(product, o.quantity, wilaya.code, o.deliveryType);
  const ref = `CMD-${Date.now().toString(36).toUpperCase()}`;

  const row = {
    secret: process.env.SHEETS_SECRET ?? "",
    ref,
    createdAt: new Date().toISOString(),
    product: product.name,
    color: o.color,
    size: o.size,
    quantity: o.quantity,
    fullName: o.fullName.trim(),
    phone: normalizePhone(o.phone),
    wilaya: `${wilaya.code} - ${wilaya.name} / ${wilaya.ar}`,
    commune: o.commune.trim(),
    address: o.deliveryType === "home" ? o.address.trim() : "",
    deliveryType: o.deliveryType === "home" ? "المنزل" : "المكتب",
    subtotal: totals.subtotal,
    delivery: totals.delivery,
    total: totals.total,
    notes: (o.notes ?? "").trim(),
    status: "جديدة",
  };

  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) {
    // Dev mode: no Google Sheet connected yet.
    console.log("[order] GOOGLE_SCRIPT_URL not set. Order:", { ...row, secret: "***" });
    return NextResponse.json({ ok: true, ref });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      redirect: "follow",
      cache: "no-store",
    });
    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.ok) throw new Error(result?.error ?? `HTTP ${res.status}`);
  } catch (err) {
    console.error("[order] Google Sheets error:", err);
    return NextResponse.json(
      { ok: false, error: "تعذّر تسجيل الطلب. حاول مجدداً أو راسلنا على واتساب." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, ref });
}
