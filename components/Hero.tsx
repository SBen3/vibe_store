import { BlurShapes } from "./BlurShapes";
import { Button } from "./ui/Button";
import { JacketArt } from "./JacketArt";

const trust = [
  "الدفع عند الاستلام",
  "التوصيل إلى 58 ولاية",
  "تأكيد الطلب عبر الهاتف",
];

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-hero bg-md-surface p-6 shadow-lg sm:p-10 md:p-14">
        <BlurShapes variant="hero" />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-[2rem] font-bold leading-[1.45] sm:text-4xl md:text-5xl md:leading-[1.4]">
              سترتك الشتوية تصلك الى باب بيتك{" "}
              <span className="text-md-accent">تدفع عند الاستلام.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-md-on-surface-variant">
              اختر الموديل واملأ النموذج في دقيقة واحدة. نتصل بك لتأكيد الطلب،
              ثم يوصله لك الموزّع.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {trust.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-md-secondary-container px-4 py-1.5 text-sm font-medium text-md-on-secondary-container"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#collection" size="lg">
                شاهد المجموعة
              </Button>
              <Button href="#commande" variant="text" size="lg">
                كيف تطلب
              </Button>
            </div>
          </div>
         {/* One orchestrated entrance: the three jackets rise in sequence. */}
<div aria-hidden="true" dir="ltr" className="relative mx-auto h-[350px] w-full max-w-md sm:h-[400px] md:h-[450px]">
  
  {/* Left Jacket (Green/White background variant) */}
  <div className="absolute -left-14 top-6 w-44 -rotate-12 z-0 sm:w-52 md:w-56">
    <div className="animate-rise" style={{ animationDelay: "150ms" }}>
      <img
        src="/blueTr.png"
        alt="Blue Jacket"
        className="w-full h-auto object-cover drop-shadow-md rounded-hero opacity-90"
      />
    </div>
  </div>

  {/* Right Jacket (Blue/White background variant) */}
  <div className="absolute -right-12 top-14 w-44 rotate-12 z-0 sm:w-52 md:w-56">
    <div className="animate-rise" style={{ animationDelay: "300ms" }}>
      <img
        src="/greenTr.png"
        alt="Green Jacket"
        className="w-full h-auto object-cover drop-shadow-md rounded-hero opacity-90"
      />
    </div>
  </div>

  {/* Center Main Jacket (Black/White foreground) */}
  <div className="absolute left-1/2 top-20 z-20 w-80 -translate-x-1/2 sm:w-68 md:w-76">
    <div className="animate-rise" style={{ animationDelay: "0ms" }}>
      <img
        src="/whiteTr.png"
        alt="White Jacket"
        className="w-full h-auto object-cover drop-shadow-2xl rounded-hero"
      />
    </div>
  </div>
  <div className="absolute left-1/2 top-0 z-22 w-80 -translate-x-1/2 sm:w-68 md:w-76">
    <div className="animate-rise" style={{ animationDelay: "0ms" }}>
      <img
        src="/blackTr.png"
        alt="Black Jacket"
        className="w-full h-auto object-cover drop-shadow-2xl rounded-hero"
      />
    </div>
  </div>

</div>
        </div>
      </div>
    </section>
  );
}
