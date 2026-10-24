import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-md-border/20 bg-md-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-2 text-2xl font-bold text-md-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent"
        >
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-md-primary shadow-[0_0_14px_2px_rgb(var(--md-primary)/0.7)]" />
          <img src="/favicon.ico" alt="Logo" className="h-16 w-auto" />
        </Link>
        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 md:flex">
          <Button href="/#collection" variant="text" size="sm">المجموعة</Button>
          <Button href="/#commande" variant="text" size="sm">كيف تطلب</Button>
          <Button href="/#faq" variant="text" size="sm">الأسئلة</Button>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button href={whatsappLink("مرحباً، لدي سؤال حول جاكيت.")} external variant="tonal" size="sm">
            واتساب
          </Button>
        </div>
      </div>
    </header>
  );
}
