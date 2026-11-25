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
| **Bouquets**: name, price, description, occasions, photo, bestseller badge | `src/data/bouquets.json` |
| **Other prices**: add-ons, delivery areas and fees, subscriptions | `src/data/prices.json` |
| Shop name, WhatsApp number, phones, address, hours, Instagram | `src/config.ts` |
| FAQ / subscription descriptions | `src/components/Faq.tsx`, `src/components/Subscriptions.tsx` |
| Brand colours and fonts | top of `src/styles.css` |

All edits can be made on GitHub in the browser: open the file, click the pencil icon, edit, then **Commit changes**. The site updates in about a minute.

### Add a bouquet
1. Open the `photos` folder on GitHub → **Add file → Upload files** → drop in the phone photo → **Commit changes**.
2. Open `src/data/bouquets.json`, copy any bouquet block, paste it after the last one and change it:
   ```json
   {
     "id": "sunflower-joy",
     "name": "Sunflower Joy",
     "price": 3000,
     "description": "Sunflowers and white roses in kraft wrap.",
     "occasions": ["Birthday", "Just because"],
     "size": "About 20 stems",
     "photo": "IMG_3001.jpeg"
   }
   ```
   - `id`: new, lowercase, words joined by dashes.
   - `photo`: the exact file name you uploaded.
   - `occasions`: names from the `occasions` list at the top of the file (add a new name there to create a new filter tab).
   - Optional: `"bestseller": true` shows the badge.
   - Every block except the last needs a comma after its `}`.
3. **Commit changes.** The photo is cropped square and compressed automatically.

If the automatic crop cuts the flowers, add `"focus": "top"` (or `bottom`, `left`, `right`, `center`). If the bouquet is small in the photo, add `"zoom": 1.5` (up to 4) to zoom in; combine with `focus` to zoom towards one side.

### Remove a bouquet
Delete its whole block from `bouquets.json` (and the comma before it if it was the last one).

### Add an add-on or delivery area
Copy a block in `src/data/prices.json` under `addOns` or `deliveryAreas` and change it. Delivery fee `0` shows as Free.

### If something goes wrong
A mistake (missing comma, price in quotes, unknown occasion, photo name typo) stops the update from publishing, and the site keeps its previous version. The **Actions** tab shows a red ✖; open it and the log lists exactly what to fix.

## Visitor statistics
The site can count visits with [GoatCounter](https://www.goatcounter.com): free, no cookies, no personal data, so no cookie banner is needed.
1. Sign up at goatcounter.com and choose a site code (e.g. `bloominflowers`).
2. Put that code in `src/config.ts` → `goatcounter: 'bloominflowers'` and commit.

Besides page views, the dashboard shows these actions:

| Event | Meaning |
|-------|---------|
| `add-to-basket/<bouquet>` | bouquet added to basket |
| `add-extra/<add-on>` | extra added (cake, teddy …) |
| `order-sent-whatsapp/<area>` | order sent on WhatsApp, with delivery area |
| `ask-whatsapp/<bouquet>` | "Ask about this on WhatsApp" clicked |
| `chat-whatsapp/<where>` | WhatsApp chat button (hero, floating button, footer) |
| `call/footer` | phone number tapped |
| `delivery-check/<area>` | delivery fee looked up |
| `subscription/<plan>` | subscription button |
| `instagram` | Instagram link |

## Search engines
The build adds a page title and description, link-preview tags (`public/social.jpg` is the image WhatsApp/Instagram show), business details for Google (address, hours, phone, bouquets and prices), and `sitemap.xml`. The site address and opening hours for Google are in `src/config.ts` (`siteUrl`, `openingHours`).

## Custom domain
The site is served at https://bloominflowers.co.ke (`public/CNAME`, `siteUrl` in `src/config.ts`).
DNS at the registrar: four `A` records for `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, and a `CNAME` for `www` → `tryzie.github.io`. Then in the repo: Settings → Pages → Custom domain → `bloominflowers.co.ke`, and tick Enforce HTTPS.

## Deploy to GitHub Pages
1. Create a repo on GitHub and push this folder to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and publishes automatically (`.github/workflows/deploy.yml`).
   The site will be at `https://<your-username>.github.io/<repo-name>/`.
