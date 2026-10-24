import type { Config } from "tailwindcss";

// Colours are CSS variables (see globals.css) so one class works in both themes
// and opacity modifiers like bg-md-primary/90 keep working.
const c = (name: string) => `rgb(var(--md-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        md: {
          background: c("background"),
          "on-background": c("on-background"),
          primary: c("primary"), // neon lime: use as a FILL
          "on-primary": c("on-primary"),
          accent: c("accent"), // lime used as TEXT / rings / outlines (readable in both themes)
          "secondary-container": c("secondary-container"),
          "on-secondary-container": c("on-secondary-container"),
          tertiary: c("tertiary"),
          "on-tertiary": c("on-tertiary"),
          surface: c("surface"),
          stage: c("stage"),
          muted: c("muted"),
          border: c("border"),
          "on-surface-variant": c("on-surface-variant"),
          error: c("error"),
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      // ~15% less roundness than before: boxes are softer-square, buttons stay pills.
      borderRadius: {
        card: "16px",
        sheet: "12px",
        hero: "24px",
      },
      transitionTimingFunction: {
        md: "cubic-bezier(0.2, 0, 0, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(28px) scale(0.96)" },
          "100%": { opacity: "1", transform: "none" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.7)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        rise: "rise 600ms cubic-bezier(0.2, 0, 0, 1) both",
        pop: "pop 400ms cubic-bezier(0.2, 0, 0, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
