// Single place for store identity. Change these first.
export const site = {
  name: "دفء",
  tagline: "جاكيتات الشتاء، الدفع عند الاستلام",
  description: "باركا، جاكيتات منفوخة وبومبر يصلك إلى 58 ولاية. تطلب في دقيقة واحدة وتدفع عند الاستلام.",
  whatsapp: "213550000000", // international format, no "+"
  phoneDisplay: "0550 00 00 00",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
