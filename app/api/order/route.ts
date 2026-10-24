import { NextResponse } from "next/server";
import { computeTotals, normalizePhone, validateOrder, type OrderInput } from "@/lib/order";
import { getProduct } from "@/lib/products";
import { getWilaya } from "@/lib/wilayas";

export const runtime = "nodejs";

// Telegram HTML mode: user text must be escaped or the message can break.
const esc = (s: string) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
  const wilaya = getWilaya(Number(o.wilayaCode));
  if (!wilaya) {
    return NextResponse.json({ ok: false, error: "طلب غير صالح." }, { status: 422 });
  }

  const totals = computeTotals(product, o.quantity, wilaya.code, o.deliveryType);
  const ref = `CMD-${Date.now().toString(36).toUpperCase()}`;

  const isHome = o.deliveryType === "home";
  const notes = (o.notes ?? "").trim().slice(0, 500);

  const text = [
    `📦 <b>طلب جديد</b> <code>${ref}</code>`,
    ``,
    `👤 ${esc(o.fullName.trim())}`,
    `📞 ${esc(normalizePhone(o.phone))}`,
    `📍 ${esc(`${wilaya.code} - ${wilaya.name} / ${esc(o.commune.trim())}`)}`,
    isHome ? `🏠 ${esc(o.address.trim())}` : `🏢 التسليم: المكتب`,
    ``,
    `🛍️ <b>${esc(product.name)}</b>`,
    `${esc(o.color)} | 📏 ${esc(o.size)} | 🔢 ${o.quantity}`,
    ``,
    `💵 المنتج: ${totals.subtotal}`,
    `🚚 التوصيل: ${totals.delivery}`,
    `💰 <b>الإجمالي: ${totals.total}</b>`,
    notes ? `\n📝 ${esc(notes)}` : "",
  ].join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[order] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in environment variables.");
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: "تعذّر تسجيل الطلب. حاول مجدداً أو راسلنا على واتساب." },
        { status: 500 }
      );
    }

    // Dev mode: Telegram not configured yet.
    console.log("[order] Telegram not configured. Message would be:\n" + text);
    return NextResponse.json({ ok: true, ref });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.ok) {
      console.error("[order] Telegram API Error Details:", result);
      throw new Error(result?.description ?? `HTTP ${res.status}`);
    }
  } catch (err) {
    console.error("[order] Telegram error:", err, "Ref:", ref);
    return NextResponse.json(
      { ok: false, error: "تعذّر تسجيل الطلب. حاول مجدداً أو راسلنا على واتساب." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, ref });
}