# Odour Elixirs — React (JSX) + Tailwind storefront

Rebuilt from your screen recording: sticky navbar → hero → about → collection → Discovery Set → circular philosophy section → FAQ → banner → journal → footer with oversized wordmark. Includes shop, product pages, cart (persisted in localStorage), checkout, order confirmation, journal articles and info pages.

## Run

```bash
npm install
cp .env.example .env
npm run dev          # site on http://localhost:5173
npm run server       # order API on :8787 (separate terminal; Vite proxies /api to it)
npm run build        # production build
```

## Add your assets (required — nothing is invented)
See `public/assets/README.txt`. Your **original logo** goes at `public/assets/logo.png`; product photos in `public/assets/products/`. Until a file exists a neutral placeholder (or a plain text wordmark for the logo) is shown.

## Where to edit
| What | File |
|---|---|
| Prices (₹349 / ₹299), shipping fee, products | `src/data/products.js` |
| FAQ answers | `src/data/faq.js` |
| Journal articles | `src/data/journal.js` |
| Shipping/returns, privacy, terms, Our Methods text (currently `[Add …]` placeholders) | `src/data/info.js` |
| WhatsApp / Instagram / nav links | `src/data/site.js` |

## Google Sheets orders
1. Create a Google Sheet → Extensions → Apps Script → paste `apps-script/Code.gs`, set `SECRET`.
2. Deploy → New deployment → Web app (Execute as: Me, Access: Anyone). Copy the URL.
3. In `.env`: `APPS_SCRIPT_URL=<url>` and `APPS_SCRIPT_SECRET=<same secret>`.
4. Host `server/index.js` anywhere that runs Node 18+ (set `ALLOWED_ORIGIN` to your site, and `VITE_API_BASE` to the API URL at build time if not same-origin).

Columns written: Order ID, Timestamp, Name, Phone, Address, City, State, PIN, Email, Products, Total, Payment method, Status (always `Pending`). Prices are recomputed on the server from `products.js`; credentials never reach the browser. The confirmation page only says "recorded" when the Sheet write was verified; otherwise it says so honestly and offers a pre-filled WhatsApp message.

## Payments
No online gateway is wired. Checkout offers **Confirm on WhatsApp**, plus **Pay by UPI** only if `VITE_UPI_ID` is set. Orders remain `Pending`; nothing is ever shown as paid.

## Status — please read
- **Not run or built yet.** The authoring sandbox had no network, so `npm install`, `npm run build` and the Google Sheets write were NOT executed. Run `npm run build` first and send me any errors.
- No existing repo/admin dashboard was provided, so this is standalone; routes, cart and API are not merged with your current backend.
- Visual values (spacing, font sizes, arc geometry) were estimated from a 1080p recording; tune in the components.
- Philosophy circles reuse your product images; swap `POOL` in `FragrancePhilosophy.jsx` for dedicated photos.
