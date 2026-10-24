"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { formatPrice } from "@/lib/format";
import { computeTotals, validateOrder, type OrderErrors, type OrderInput } from "@/lib/order";
import type { Product } from "@/lib/products";
import { deliveryFee, wilayas, type DeliveryType } from "@/lib/wilayas";
import { BlurShapes } from "./BlurShapes";
import { JacketArt } from "./JacketArt";
import { Button } from "./ui/Button";
import { SelectField, TextField } from "./ui/Field";

function Chip({ selected, onClick, children, label }: { selected: boolean; onClick: () => void; children: ReactNode; label?: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      onClick={onClick}
      className={`h-10 min-w-12 rounded-full border px-4 text-sm font-medium transition-all duration-300 ease-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent focus-visible:ring-offset-2 focus-visible:ring-offset-md-surface ${
        selected
          ? "border-transparent bg-md-secondary-container text-md-on-secondary-container shadow-sm"
          : "border-md-border text-md-on-surface-variant hover:bg-md-accent/5"
      }`}
    >
      {children}
    </button>
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilayaCode, setWilayaCode] = useState(0);
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("home");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<OrderErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const colorHex = product.colors.find((c) => c.name === color)?.hex ?? product.colors[0].hex;
  const totals = computeTotals(product, quantity, wilayaCode, deliveryType);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    const input: OrderInput = { productSlug: product.slug, color, size, quantity, fullName, phone, wilayaCode, commune, address, deliveryType, notes };
    const errs = validateOrder(input, product);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      document.getElementById("order-form")?.querySelector<HTMLElement>("[aria-invalid=true], [data-invalid=true]")?.focus();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push(`/order/success?ref=${encodeURIComponent(data.ref)}`);
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error ?? "تعذّر إرسال الطلب. تحقق من الحقول وحاول مجدداً.");
    } catch {
      setServerError("تعذّر الاتصال. تحقق من الشبكة وحاول مجدداً.");
    }
    setLoading(false);
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      {/* Visual */}
      <div className="relative overflow-hidden rounded-hero bg-md-stage p-8 shadow-md sm:p-12 lg:sticky lg:top-24">
        <BlurShapes variant="soft" />
        <JacketArt color={colorHex} label={`${product.name}، ${color}`} className="relative mx-auto w-full max-w-sm transition-all duration-500 ease-md" />
        <p className="relative mt-4 text-center text-sm font-medium text-md-on-background">اللون: {color}</p>
      </div>

      {/* Details + order */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm text-md-on-surface-variant">{product.category}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-md-accent">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-lg text-md-on-surface-variant line-through">{formatPrice(product.oldPrice)}</span>}
            {discount > 0 && <span className="rounded-full bg-md-primary px-3 py-1 text-xs font-bold text-md-on-primary" dir="ltr">-{discount}%</span>}
          </div>
          <p className="mt-4 max-w-prose leading-relaxed text-md-on-surface-variant">{product.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.features.map((f) => (
              <li key={f} className="rounded-full bg-md-surface px-3 py-1 text-sm text-md-on-surface-variant">{f}</li>
            ))}
          </ul>
        </div>

        <form id="order-form" onSubmit={onSubmit} noValidate className="flex flex-col gap-6 rounded-card bg-md-surface p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-medium">اطلب الآن، وادفع عند الاستلام</h2>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 text-sm font-medium text-md-on-surface-variant">اللون</legend>
            <div role="radiogroup" aria-label="اللون" className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <Chip key={c.name} selected={color === c.name} onClick={() => setColor(c.name)}>
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-4 w-4 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </span>
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 text-sm font-medium text-md-on-surface-variant">المقاس</legend>
            <div role="radiogroup" aria-label="المقاس" data-invalid={!!errors.size} tabIndex={-1} className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <Chip key={s} selected={size === s} onClick={() => setSize(s)}>{s}</Chip>
              ))}
            </div>
            {errors.size && <p role="alert" className="text-xs text-md-error">{errors.size}</p>}
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <span id="qty-label" className="text-sm font-medium text-md-on-surface-variant">الكمية</span>
            <div role="group" aria-labelledby="qty-label" className="flex w-fit items-center gap-1 rounded-full bg-md-muted p-1">
              <button type="button" aria-label="تقليل الكمية" disabled={quantity <= 1} onClick={() => setQuantity((q) => q - 1)} className="h-10 w-10 rounded-full text-xl transition-all duration-200 hover:bg-md-accent/10 active:scale-95 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent">−</button>
              <span aria-live="polite" className="w-10 text-center font-medium">{quantity}</span>
              <button type="button" aria-label="زيادة الكمية" disabled={quantity >= 10} onClick={() => setQuantity((q) => q + 1)} className="h-10 w-10 rounded-full text-xl transition-all duration-200 hover:bg-md-accent/10 active:scale-95 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent">+</button>
            </div>
          </div>

          <hr className="border-md-border/20" />

          <TextField label="الاسم الكامل" name="fullName" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} />
          <TextField label="رقم الهاتف" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" className="text-right" placeholder="05 50 12 34 56" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} hint="سنتصل بك على هذا الرقم لتأكيد الطلب." />

          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField label="الولاية" name="wilaya" value={wilayaCode || ""} onChange={(e) => setWilayaCode(Number(e.target.value))} error={errors.wilayaCode}>
              <option value="">اختر…</option>
              {wilayas.map((w) => (
                <option key={w.code} value={w.code}>{String(w.code).padStart(2, "0")} - {w.ar}</option>
              ))}
            </SelectField>
            <TextField label="البلدية" name="commune" value={commune} onChange={(e) => setCommune(e.target.value)} error={errors.commune} />
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 text-sm font-medium text-md-on-surface-variant">التوصيل</legend>
            <div role="radiogroup" aria-label="طريقة التوصيل" className="flex flex-wrap gap-2">
              <Chip selected={deliveryType === "home"} onClick={() => setDeliveryType("home")}>
                إلى المنزل{wilayaCode ? ` · ${formatPrice(deliveryFee(wilayaCode, "home"))}` : ""}
              </Chip>
              <Chip selected={deliveryType === "desk"} onClick={() => setDeliveryType("desk")}>
                إلى مكتب التوصيل{wilayaCode ? ` · ${formatPrice(deliveryFee(wilayaCode, "desk"))}` : ""}
              </Chip>
            </div>
          </fieldset>

          {deliveryType === "home" && (
            <TextField label="العنوان الكامل" name="address" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} error={errors.address} />
          )}
          <TextField label="ملاحظة (اختياري)" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} error={errors.notes} />

          {/* Honeypot: hidden from people and assistive tech */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website<input tabIndex={-1} autoComplete="off" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
          </div>

          <dl className="flex flex-col gap-2 rounded-sheet bg-md-secondary-container p-5 text-md-on-secondary-container">
            <div className="flex justify-between text-sm"><dt>{product.name} × {quantity}</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
            <div className="flex justify-between text-sm">
              <dt>التوصيل</dt>
              <dd>{wilayaCode ? formatPrice(totals.delivery) : "اختر الولاية"}</dd>
            </div>
            <div className="mt-1 flex justify-between border-t border-md-on-secondary-container/20 pt-3 text-lg font-bold">
              <dt>المبلغ عند الاستلام</dt><dd>{formatPrice(totals.total)}</dd>
            </div>
          </dl>

          {serverError && <p role="alert" className="rounded-card bg-md-error/10 p-4 text-sm text-md-error">{serverError}</p>}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "جارٍ الإرسال…" : "تأكيد الطلب"}
          </Button>
          <p className="text-center text-xs text-md-on-surface-variant">لا يوجد دفع إلكتروني. تدفع نقداً عند الاستلام.</p>
        </form>
      </div>
    </div>
  );
}
