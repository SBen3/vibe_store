import type { Metadata } from "next";
import { BlurShapes } from "@/components/BlurShapes";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "تم إرسال الطلب", robots: { index: false } };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6">
      <div className="relative overflow-hidden rounded-hero bg-md-surface p-8 text-center shadow-lg sm:p-12">
        <BlurShapes variant="soft" />
        <div className="relative">
          <div className="mx-auto flex h-20 w-20 animate-pop items-center justify-center rounded-full bg-md-primary text-md-on-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 5 5L20 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">تم إرسال طلبك</h1>
          <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-md-on-surface-variant">
            سنتصل بك قريباً لتأكيد الطلب. أبقِ هاتفك قريباً منك.
          </p>
          {ref && (
            <p className="mt-6 inline-block rounded-full bg-md-secondary-container px-5 py-2 text-sm font-medium text-md-on-secondary-container">
              المرجع: <span dir="ltr">{ref}</span>
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" size="lg">العودة إلى المتجر</Button>
            <Button href={whatsappLink(ref ? `مرحباً، طلبي ${ref}` : undefined)} external variant="tonal" size="lg">
              راسلنا على واتساب
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
