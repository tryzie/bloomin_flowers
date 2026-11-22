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
| Bouquets, prices, add-ons | `src/data/products.ts` |
| Delivery areas and fees | `src/data/zones.ts` |
| FAQ / subscription plans | `src/components/Faq.tsx`, `src/components/Subscriptions.tsx` |
| Brand colours and fonts | top of `src/styles.css` |

**Adding real photos:** put images in `public/images/` and set `image: './images/your-photo.jpg'` on the product. The illustrated bouquet is shown until you do.

## Deploy to GitHub Pages
1. Create a repo on GitHub and push this folder to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and publishes automatically (`.github/workflows/deploy.yml`).
   The site will be at `https://<your-username>.github.io/<repo-name>/`.
