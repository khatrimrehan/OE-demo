# Odour Elixirs — React (JSX) + Tailwind storefront

Rebuilt from your screen recording: sticky navbar → hero → about → collection → Discovery Set → circular philosophy section → FAQ → banner → journal → footer with oversized wordmark. Includes shop, product pages, cart (persisted in localStorage), checkout, order confirmation, journal articles and info pages.

/products/`. Until a file exists a neutral placeholder (or a plain text wordmark for the logo) is shown.


## Google Sheets orders
1. Create a Google Sheet → Extensions → Apps Script → paste `apps-script/Code.gs`, set `SECRET`.
2. Deploy → New deployment → Web app (Execute as: Me, Access: Anyone). Copy the URL.
3. In `.env`: `APPS_SCRIPT_URL=<url>` and `APPS_SCRIPT_SECRET=<same secret>`.
4. Host `server/index.js` anywhere that runs Node 18+ (set `ALLOWED_ORIGIN` to your site, and `VITE_API_BASE` to the API URL at build time if not same-origin).

Columns written: Order ID, Timestamp, Name, Phone, Address, City, State, PIN, Email, Products, Total, Payment method, Status (always `Pending`). Prices are recomputed on the server from `products.js`; credentials never reach the browser. The confirmation page only says "recorded" when the Sheet write was verified; otherwise it says so honestly and offers a pre-filled WhatsApp message.

## Payments
No online gateway is wired. Checkout offers **Confirm on WhatsApp**, plus **Pay by UPI** only if `VITE_UPI_ID` is set. Orders remain `Pending`; nothing is ever shown as paid.
