import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/ProductPurchase";
import { getProduct, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <nav aria-label="مسار التنقل" className="mb-6 text-sm text-md-on-surface-variant">
        <Link href="/#collection" className="rounded-full px-1 hover:text-md-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent">
          المجموعة
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{product.name}</span>
      </nav>
      <ProductPurchase product={product} />
    </div>
  );
}
