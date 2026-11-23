# Bloomin Flowers — website

Elegant floral arrangements · Cianda House, Koinange St, Nairobi.
A static React + TypeScript + Vite site, hosted free on GitHub Pages.

**What it does**
- Shop with occasion filters, budget slider and sorting
- Basket saved in the browser (survives refresh)
- Delivery-fee checker by Nairobi area
- Checkout sends the full order (items, area, recipient, card message, total) to the shop's WhatsApp; the shop replies to confirm and arrange payment
- Subscription plans, FAQ, contact details, floating WhatsApp button

## Run locally
```bash
npm install
npm run dev
```

## Edit your content
| What | File |
|------|------|
| Shop name, WhatsApp number, phones, address, hours, Instagram | `src/config.ts` |
| **All prices** (bouquets, add-ons, delivery fees, subscriptions) | `src/data/prices.json` |
| Bouquet descriptions, photos, occasions | `src/data/products.ts` |
| FAQ / subscription plans | `src/components/Faq.tsx`, `src/components/Subscriptions.tsx` |
| Brand colours and fonts | top of `src/styles.css` |

**Photos:** product photos live in `public/images/` as square JPEGs about 900px wide (keeps the site fast on mobile data). To add a bouquet, crop the photo square, save it there, and add an entry with `image: './images/<name>.jpg'` in `src/data/products.ts`.

## Changing prices (no coding needed)
1. On GitHub, open `src/data/prices.json` and click the pencil icon (Edit).
2. Change the numbers: whole KSh, no commas (`3500`, not `3,500`). Delivery fee `0` shows as Free.
3. Click **Commit changes**. The site updates in about a minute.

If you make a mistake (a missing comma, a price in quotes), the update is not published and the site keeps its previous prices. The **Actions** tab shows a red ✖; open it to see a message saying what to fix.

## Deploy to GitHub Pages
1. Create a repo on GitHub and push this folder to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and publishes automatically (`.github/workflows/deploy.yml`).
   The site will be at `https://<your-username>.github.io/<repo-name>/`.
