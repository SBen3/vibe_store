import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";
import { JacketArt } from "./JacketArt";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col gap-4 rounded-card bg-md-surface p-4 shadow-sm transition-all duration-300 ease-md hover:scale-[1.02] hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent focus-visible:ring-offset-2 focus-visible:ring-offset-md-background"
    >
      <div className="relative overflow-hidden rounded-sheet bg-md-stage p-6">
        {discount > 0 && (
          <span dir="ltr" className="absolute start-4 top-4 z-10 rounded-full bg-md-primary px-3 py-1 text-xs font-bold text-md-on-primary">
            -{discount}%
          </span>
        )}
        <JacketArt
          color={product.colors[0].hex}
          label={`${product.name}، ${product.colors[0].name}`}
          className="mx-auto w-full max-w-[220px] transition-transform duration-500 ease-md group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
        <div>
          <p className="text-sm text-md-on-surface-variant">{product.category}</p>
          <h3 className="text-xl font-medium">{product.name}</h3>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-md-accent">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="text-sm text-md-on-surface-variant line-through">{formatPrice(product.oldPrice)}</p>
            )}
          </div>
          <ul className="flex -space-x-1 rtl:space-x-reverse" aria-label={`الألوان: ${product.colors.map((c) => c.name).join("، ")}`}>
            {product.colors.map((c) => (
              <li key={c.name} title={c.name} className="h-6 w-6 rounded-full border-2 border-md-surface" style={{ backgroundColor: c.hex }} />
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
