// Single place for store identity. Change these first.
export const site = {
  name: "Vibe Store",
  tagline: "جاكيتات الشتاء، الدفع عند الاستلام",
  description: "باركا، جاكيتات منفوخة وبومبر يصلك إلى 58 ولاية. تطلب في دقيقة واحدة وتدفع عند الاستلام.",
  whatsapp: "213781485682", // international format, no "+"
  phoneDisplay: "07 81 48 56 82",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
