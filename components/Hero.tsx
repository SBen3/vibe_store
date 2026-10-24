import { BlurShapes } from "./BlurShapes";
import { Button } from "./ui/Button";
import { JacketArt } from "./JacketArt";

const trust = ["الدفع عند الاستلام", "التوصيل إلى 58 ولاية", "تأكيد الطلب عبر الهاتف"];

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-hero bg-md-surface p-6 shadow-lg sm:p-10 md:p-14">
        <BlurShapes variant="hero" />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-[2rem] font-bold leading-[1.45] sm:text-4xl md:text-5xl md:leading-[1.4]">
              جاكيتك الشتوي يصلك إلى باب بيتك. <span className="text-md-accent">تدفع عند الاستلام.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-md-on-surface-variant">
              اختر الموديل واملأ النموذج في دقيقة واحدة. نتصل بك لتأكيد الطلب، ثم يوصله لك الموزّع.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {trust.map((t) => (
                <li key={t} className="rounded-full bg-md-secondary-container px-4 py-1.5 text-sm font-medium text-md-on-secondary-container">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#collection" size="lg">شاهد المجموعة</Button>
              <Button href="#commande" variant="text" size="lg">كيف تطلب</Button>
            </div>
          </div>

          {/* One orchestrated entrance: the three jackets rise in sequence. */}
          <div aria-hidden="true" dir="ltr" className="relative mx-auto h-[300px] w-full max-w-md sm:h-[380px] md:h-[420px]">
            <div className="absolute left-0 top-14 w-40 -rotate-6 sm:w-48 md:w-52">
              <div className="animate-rise" style={{ animationDelay: "150ms" }}>
                <JacketArt color="#5B6247" label="" className="w-full drop-shadow-lg" />
              </div>
            </div>
            <div className="absolute right-0 top-16 w-40 rotate-6 sm:w-48 md:w-52">
              <div className="animate-rise" style={{ animationDelay: "300ms" }}>
                <JacketArt color="#C8B79B" label="" className="w-full drop-shadow-lg" />
              </div>
            </div>
            <div className="absolute left-1/2 top-0 z-10 w-52 -translate-x-1/2 sm:w-64 md:w-72">
              <div className="animate-rise" style={{ animationDelay: "0ms" }}>
                <JacketArt color="#2F3E5C" label="" className="w-full drop-shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
