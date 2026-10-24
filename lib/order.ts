import type { Product } from "./products";
import { deliveryFee, getWilaya, type DeliveryType } from "./wilayas";

export interface OrderInput {
  productSlug: string;
  color: string;
  size: string;
  quantity: number;
  fullName: string;
  phone: string;
  wilayaCode: number;
  commune: string;
  address: string;
  deliveryType: DeliveryType;
  notes?: string;
}

export type OrderErrors = Partial<Record<keyof OrderInput, string>>;

export const normalizePhone = (v: string) =>
  v.replace(/[\s.\-()]/g, "").replace(/^\+213/, "0").replace(/^00213/, "0");

// Algerian mobile: 05 / 06 / 07 + 8 digits
export const isValidPhone = (v: string) => /^0[567]\d{8}$/.test(normalizePhone(v));

export function computeTotals(product: Product, quantity: number, wilayaCode: number, type: DeliveryType) {
  const subtotal = product.price * quantity;
  const delivery = wilayaCode ? deliveryFee(wilayaCode, type) : 0;
  return { subtotal, delivery, total: subtotal + delivery };
}

/** Shared by the browser (instant feedback) and the API route (the real check). */
export function validateOrder(i: Partial<OrderInput>, product: Product | undefined): OrderErrors {
  const e: OrderErrors = {};
  if (!product) {
    e.productSlug = "المنتج غير موجود.";
    return e;
  }
  if (!i.color || !product.colors.some((c) => c.name === i.color)) e.color = "اختر اللون.";
  if (!i.size || !product.sizes.includes(i.size)) e.size = "اختر المقاس.";
  if (!Number.isInteger(i.quantity) || (i.quantity as number) < 1 || (i.quantity as number) > 10)
    e.quantity = "الكمية بين 1 و 10.";
  if (!i.fullName || i.fullName.trim().length < 3) e.fullName = "أدخل اسمك الكامل.";
  if (!i.phone || !isValidPhone(i.phone)) e.phone = "رقم الهاتف غير صحيح. مثال: 0550 12 34 56";
  if (!i.wilayaCode || !getWilaya(Number(i.wilayaCode))) e.wilayaCode = "اختر الولاية.";
  if (!i.commune || i.commune.trim().length < 2) e.commune = "أدخل البلدية.";
  if (i.deliveryType !== "home" && i.deliveryType !== "desk") e.deliveryType = "اختر طريقة التوصيل.";
  if (i.deliveryType === "home" && (!i.address || i.address.trim().length < 5))
    e.address = "أدخل عنوانك الكامل.";
  if (i.notes && i.notes.length > 300) e.notes = "300 حرف كحد أقصى.";
  return e;
}
