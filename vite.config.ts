import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { SHOP } from './src/config';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Adds what Google and link previews (WhatsApp, Instagram, Facebook) read:
// description, canonical URL, Open Graph tags, business details as JSON-LD,
// plus robots.txt and sitemap.xml. Optionally loads GoatCounter statistics.
function seo(): Plugin {
  const site = SHOP.siteUrl.endsWith('/') ? SHOP.siteUrl : `${SHOP.siteUrl}/`;
  const { bouquets } = JSON.parse(readFileSync(new URL('./src/data/bouquets.json', import.meta.url), 'utf8'));
  const prices: number[] = bouquets.map((b: { price: number }) => b.price);
  const from = Math.min(...prices);
  const ksh = (n: number) => `KSh ${n.toLocaleString('en-KE')}`;

  const title = `${SHOP.name} | Flower Delivery in Nairobi: Roses, Bouquets & Gifts`;
  const description =
    `Fresh roses, bouquets, money and snack bouquets delivered across Nairobi, same day. ` +
    `From ${ksh(from)}. Visit us at ${SHOP.address} or order on WhatsApp ${SHOP.phones[0]}.`;
  const image = `${site}social.jpg`;

  const business = {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    name: SHOP.name,
    slogan: SHOP.tagline,
    description,
    url: site,
    image,
    logo: `${site}images/logo.png`,
    telephone: `+${SHOP.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cianda House, Koinange Street',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
    areaServed: { '@type': 'City', name: 'Nairobi' },
    openingHours: SHOP.openingHours,
    priceRange: `${ksh(from)} – ${ksh(Math.max(...prices))}`,
    currenciesAccepted: 'KES',
    sameAs: [`https://instagram.com/${SHOP.instagramHandle}`],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bouquets',
      itemListElement: bouquets.map((b: { id: string; name: string; description: string; price: number }) => ({
        '@type': 'Offer',
        price: b.price,
        priceCurrency: 'KES',
        itemOffered: {
          '@type': 'Product',
          name: b.name,
          description: b.description,
          image: `${site}images/${b.id}.jpg`,
        },
      })),
    },
  };

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${site}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SHOP.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${site}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_KE" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(business).replace(/</g, '\\u003c')}</script>`,
  ];
  if (SHOP.goatcounter) {
    tags.push(
      `<script data-goatcounter="https://${SHOP.goatcounter}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`,
    );
  }

  return {
    name: 'bloomin-seo',
    transformIndexHtml(html) {
      return html.replace('<!--seo-->', tags.join('\n    '));
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n` });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url><loc>${site}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n` +
          `</urlset>\n`,
      });
    },
  };
}

// base './' makes the build work at https://<user>.github.io/<repo>/ without changes
export default defineConfig({
  plugins: [react(), seo()],
  base: './',
});
