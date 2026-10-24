# دفء: متجر جاكيتات (Next.js + Tailwind + TypeScript)

Arabic / RTL cash-on-delivery store for Algeria. Neon lime theme, dark mode by default.

## Run
```bash
npm install
cp .env.example .env.local     # Windows: copy .env.example .env.local
npm run dev                    # http://localhost:3000
```
Versions are pinned (Next 15.5.28, Tailwind 3.4.17). Do NOT run `npm install tailwindcss` without a version: it installs v4 and breaks the build.
Without `GOOGLE_SCRIPT_URL`, orders are printed in the terminal.

## Theme
- Dark first: every new visitor sees dark mode. The sun/moon button in the header switches and remembers the choice.
- Colours are CSS variables in `app/globals.css` (`:root` = light, `.dark` = dark). Change the lime in one place: `--md-primary`.
- `--md-primary` = lime as a fill. `--md-accent` = lime as text (dark olive in light mode so it stays readable).
- Box radius: `tailwind.config.ts` > `borderRadius` (card 16px, sheet 12px, hero 24px). Buttons stay pills.

## Edit first
| File | What |
|---|---|
| `lib/site.ts` | Store name, WhatsApp number, phone |
| `lib/products.ts` | Products, prices, colours, sizes, Arabic copy |
| `lib/wilayas.ts` | Delivery fees (PLACEHOLDERS: use your carrier's tariff) |
| `components/JacketArt.tsx` | Placeholder art: replace with real photos |

## Google Sheets + Telegram
1. New Google Sheet > Extensions > Apps Script > paste `google-apps-script/Code.gs`.
2. Set `SECRET`. Optional: set `TELEGRAM_TOKEN` and `TELEGRAM_CHAT_ID` for a phone notification per order.
3. Deploy > New deployment > Web app (Execute as: Me, Access: Anyone). Copy the URL.
4. `.env.local`: `GOOGLE_SCRIPT_URL=<url>`, `SHEETS_SECRET=<same secret>`.
5. Place a test order. The "الطلبات" tab is created with a status dropdown.
After editing the script: Deploy > Manage deployments > pencil > New version.

## Deploy
Vercel / Netlify / Cloudflare: import the repo and add the two env vars.
