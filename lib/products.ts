export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  features: string[];
  colors: ProductColor[];
  sizes: string[];
}

const SIZES = ["S", "M", "L", "XL", "XXL"];

// Placeholder catalogue: replace names, prices and copy with your real stock.
export const products: Product[] = [
  {
    slug: "CanadaGoose",
    name: "Canada Goose",
    category: "Jackets",
    price: 3600,
    oldPrice: 4900,
    image: "/white.jpg",
    description: "جاكيت منفوخ و دافئ",
    features: ["حشوة دافئة", " ستايل جميل ", "خفيف الوزن"],
   colors: [
  { name: "أبيض", hex: "#FFFFFF", image: "/white.jpg" },
  { name: "أزرق", hex: "#1D64EC", image: "/blue.jpg" },
  { name: "أخضر", hex: "#229C52", image: "/green.jpg" },
  { name: "أسود", hex: "#1A1A1A", image: "/black.jpg" },
],
    sizes: SIZES,
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
 