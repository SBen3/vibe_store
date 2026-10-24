import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl px-4 pb-10 sm:px-6">
      <div className="flex flex-col gap-6 rounded-card bg-md-surface p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xl font-bold text-md-accent">{site.name}</p>
          <p className="mt-1 text-sm text-md-on-surface-variant">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-md-on-surface-variant sm:items-end">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full font-medium text-md-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent"
          >
            واتساب: <span dir="ltr">{site.phoneDisplay}</span>
          </a>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
