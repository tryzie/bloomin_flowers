// Runs before every build. If prices.json has a mistake, the build stops
// and the live site keeps its previous version.
import { readFileSync } from 'node:fs';

const fail = (msg) => {
  console.error(`\n✖ prices.json problem: ${msg}\n`);
  process.exit(1);
};

let data;
try {
  data = JSON.parse(readFileSync(new URL('../src/data/prices.json', import.meta.url), 'utf8'));
} catch (e) {
  fail(`the file is not valid JSON (check for a missing comma or quote). ${e.message}`);
}

const isPrice = (n) => Number.isInteger(n) && n >= 0;
for (const key of ['bouquets', 'addOns', 'deliveryAreas', 'subscriptions']) {
  if (!Array.isArray(data[key])) fail(`"${key}" list is missing.`);
}
for (const b of [...data.bouquets, ...data.addOns]) {
  if (!b.id || !b.name) fail(`an item is missing its "id" or "name": ${JSON.stringify(b)}`);
  if (!isPrice(b.price)) fail(`"${b.name}" has price ${JSON.stringify(b.price)}; use a whole number like 3500.`);
}
for (const d of data.deliveryAreas) {
  if (!d.area) fail(`a delivery area is missing its "area": ${JSON.stringify(d)}`);
  if (!isPrice(d.fee)) fail(`"${d.area}" has fee ${JSON.stringify(d.fee)}; use a whole number like 300.`);
  if (typeof d.sameDay !== 'boolean') fail(`"${d.area}" sameDay must be true or false.`);
}
for (const s of data.subscriptions) {
  if (!isPrice(s.price)) fail(`plan "${s.plan}" has price ${JSON.stringify(s.price)}.`);
}
const ids = data.bouquets.map((b) => b.id);
const dup = ids.find((id, i) => ids.indexOf(id) !== i);
if (dup) fail(`bouquet id "${dup}" appears twice.`);

// Every bouquet in products.ts must have a price, and every priced id must exist.
const src = readFileSync(new URL('../src/data/products.ts', import.meta.url), 'utf8');
const detailIds = [...src.matchAll(/^\s{4}id: '([^']+)'/gm)].map((m) => m[1]);
const missing = detailIds.filter((id) => !ids.includes(id));
if (missing.length) fail(`no price for: ${missing.join(', ')}. Add them to "bouquets".`);
const unknown = ids.filter((id) => !detailIds.includes(id));
if (unknown.length) fail(`unknown bouquet id(s): ${unknown.join(', ')}. Ids must match products.ts.`);

console.log(`✓ prices.json OK: ${data.bouquets.length} bouquets, ${data.addOns.length} add-ons, ${data.deliveryAreas.length} areas, ${data.subscriptions.length} plans`);
