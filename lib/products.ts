export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  description: string;
  features: string[];
  colors: ProductColor[];
  sizes: string[];
}

const SIZES = ["S", "M", "L", "XL", "XXL"];

// Placeholder catalogue: replace names, prices and copy with your real stock.
export const products: Product[] = [
  {
    slug: "parka-atlas",
    name: "باركا أطلس",
    category: "باركا",
    price: 9800,
    oldPrice: 12500,
    description: "باركا طويلة بقبعة، مصممة للشتاء البارد. قصة مستقيمة وبطانة دافئة وسحاب مزدوج للحماية.",
    features: ["قبعة مبطّنة", "بطانة دافئة", "جيوب بسحاب", "سحاب مزدوج"],
    colors: [
      { name: "أسود", hex: "#2A2830" },
      { name: "أخضر زيتي", hex: "#5B6247" },
      { name: "أزرق ليلي", hex: "#2F3E5C" },
    ],
    sizes: SIZES,
  },
  {
    slug: "bomber-tell",
    name: "بومبر التل",
    category: "بومبر",
    price: 6900,
    description: "البومبر الكلاسيكي، خفيف وسهل الارتداء كل يوم. أطراف مطاطية وياقة عالية.",
    features: ["أطراف مطاطية", "ياقة عالية", "جيوب جانبية", "قصة ضيقة"],
    colors: [
      { name: "أخضر عسكري", hex: "#4F5A3C" },
      { name: "أسود", hex: "#2A2830" },
      { name: "خمري", hex: "#6E2B3A" },
    ],
    sizes: SIZES,
  },
  {
    slug: "doudoune-aures",
    name: "جاكيت الأوراس المنفوخ",
    category: "جاكيت منفوخ",
    price: 8500,
    oldPrice: 10000,
    description: "جاكيت منفوخ خفيف لكنه دافئ جداً. يُلبس وحده أو تحت معطف.",
    features: ["حشوة دافئة", "ياقة عالية", "جيوب بسحاب", "خفيف الوزن"],
    colors: [
      { name: "رملي", hex: "#C8B79B" },
      { name: "أسود", hex: "#2A2830" },
      { name: "أزرق بترولي", hex: "#2E5A66" },
    ],
    sizes: SIZES,
  },
  {
    slug: "veste-kasbah",
    name: "جاكيت جينز القصبة",
    category: "جاكيت جينز",
    price: 5400,
    description: "جاكيت جينز سميك بقصة عادية. يناسب كل شيء ويزداد جمالاً مع الاستعمال.",
    features: ["جينز سميك", "أزرار معدنية", "جيوب على الصدر", "قصة عادية"],
    colors: [
      { name: "أزرق مغسول", hex: "#6F8FB5" },
      { name: "أزرق داكن", hex: "#34476B" },
    ],
    sizes: SIZES,
  },
  {
    slug: "teddy-hoggar",
    name: "تيدي الهقار",
    category: "تيدي",
    price: 7200,
    description: "جاكيت من الفرو الصناعي المجعّد، ناعم ودافئ جداً. القطعة التي تلفت الأنظار في الشارع.",
    features: ["فرو صناعي ناعم", "أزرار ضغط", "جيوب جانبية", "قصة واسعة"],
    colors: [
      { name: "كريمي", hex: "#E9DFCB" },
      { name: "بني", hex: "#7A5A43" },
    ],
    sizes: SIZES,
  },
  {
    slug: "coupe-vent-djurdjura",
    name: "واقي الرياح جرجرة",
    category: "واقي رياح",
    price: 4900,
    description: "واقي رياح خفيف ومقاوم للماء، مثالي للأيام الباردة ونصف الموسم.",
    features: ["قماش مقاوم للماء", "قبعة قابلة للطي", "خفيف", "جيوب بسحاب"],
    colors: [
      { name: "برتقالي محروق", hex: "#C25B32" },
      { name: "كحلي", hex: "#243556" },
      { name: "رمادي", hex: "#8C8A94" },
    ],
    sizes: SIZES,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
