"use client";

/** Dark is the default. Choice is saved; the inline script in layout.tsx applies it before paint. */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const nowDark = root.classList.toggle("dark");
    try {
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="تبديل الوضع الليلي والنهاري"
      className="flex h-10 w-10 items-center justify-center rounded-full text-md-accent transition-all duration-300 ease-md hover:bg-md-accent/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent"
    >
      {/* sun: shown in dark mode (click to go light) */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden h-5 w-5 dark:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* moon: shown in light mode (click to go dark) */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 dark:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
