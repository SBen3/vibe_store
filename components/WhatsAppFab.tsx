import { whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("مرحباً، لدي سؤال حول جاكيت.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="راسلنا على واتساب"
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-md-tertiary text-md-on-tertiary shadow-md transition-all duration-300 ease-md hover:bg-md-tertiary/90 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent focus-visible:ring-offset-2 focus-visible:ring-offset-md-background"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.3-1.8-1-.9.7a3.3 3.3 0 0 1-1.6-1.6l.7-.9-1-1.8L9 9.5Z" />
      </svg>
    </a>
  );
}
