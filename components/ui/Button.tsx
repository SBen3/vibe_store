import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "filled" | "tonal" | "outlined" | "text" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap " +
  "transition-all duration-300 ease-md active:scale-95 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent focus-visible:ring-offset-2 focus-visible:ring-offset-md-background " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  filled: "bg-md-primary text-md-on-primary hover:bg-md-primary/90 hover:shadow-md active:bg-md-primary/80",
  tonal:
    "bg-md-secondary-container text-md-on-secondary-container hover:bg-md-secondary-container/90 hover:shadow-md active:bg-md-secondary-container/80",
  outlined: "border border-md-border text-md-accent hover:bg-md-accent/5 active:bg-md-accent/10",
  text: "text-md-accent hover:bg-md-accent/10 active:bg-md-accent/5",
  // For use on top of a lime (primary) surface
  inverse: "bg-md-on-primary text-md-primary hover:bg-md-on-primary/90 hover:shadow-md active:bg-md-on-primary/80",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  href?: string;
  external?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ variant = "filled", size = "md", className = "", href, external, children, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
