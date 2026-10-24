import { useId } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

/** Material 3 filled text field: rounded top, square bottom, 2px bottom border. */
const control =
  "h-14 w-full rounded-t-lg rounded-b-none bg-md-muted px-4 text-base text-md-on-background " +
  "border-b-2 border-md-border placeholder:text-md-on-background/50 " +
  "transition-colors duration-200 hover:bg-md-muted/80 " +
  "focus:border-md-accent focus:outline-none focus:ring-2 focus:ring-md-accent/30 " +
  "aria-[invalid=true]:border-md-error";

function Wrapper({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-md-on-surface-variant">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} role="alert" className="text-xs text-md-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-xs text-md-on-surface-variant">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextProps = { label: string; error?: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, error, hint, className = "", ...rest }: TextProps) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <input id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-msg` : undefined} className={`${control} ${className}`} {...rest} />
    </Wrapper>
  );
}

type SelectProps = { label: string; error?: string; hint?: string } & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ label, error, hint, children, className = "", ...rest }: SelectProps) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <div className="relative">
        <select id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-msg` : undefined} className={`${control} appearance-none pe-12 ${className}`} {...rest}>
          {children}
        </select>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2 text-md-on-surface-variant" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </Wrapper>
  );
}
