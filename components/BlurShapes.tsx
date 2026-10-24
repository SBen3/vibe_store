/** Signature Material You atmosphere: blurred organic shapes. Decorative only. */
export function BlurShapes({ variant = "hero" }: { variant?: "hero" | "cta" | "soft" }) {
  if (variant === "cta") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 translate-x-1/4 rounded-[100px] rounded-tr-[20px] bg-[#F4FF8A]/80 blur-3xl" />
      </div>
    );
  }
  if (variant === "soft") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-md-primary/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-md-primary/15 blur-3xl" />
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgb(var(--md-secondary-container))_0%,_transparent_45%)] opacity-80" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-[100px] rounded-tr-[20px] bg-md-primary/25 blur-3xl" />
      <div className="absolute -bottom-32 left-0 h-96 w-96 -translate-x-1/4 rounded-full bg-md-primary/15 blur-3xl" />
      <div className="absolute bottom-10 right-1/3 h-48 w-48 rounded-full bg-md-primary/10 blur-3xl" />
    </div>
  );
}
