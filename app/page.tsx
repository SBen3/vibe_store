import { BlurShapes } from "@/components/BlurShapes";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="collection" className="mx-auto mt-24 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <h2 className="text-3xl font-bold md:text-5xl">المجموعة</h2>
        <p className="mt-3 max-w-xl text-lg text-md-on-surface-variant">كل موديل يُطلب في دقيقة واحدة، دون إنشاء حساب.</p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <HowItWorks />
      <Faq />

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-hero bg-md-primary p-10 text-md-on-primary shadow-lg md:p-16">
          <BlurShapes variant="cta" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-xl text-3xl font-bold leading-[1.5] md:text-4xl">
              جاهز للشتاء؟ اختر جاكيتك وادفع عند الاستلام.
            </h2>
            <Button href="#collection" variant="inverse" size="lg">
              اختر جاكيتي
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
