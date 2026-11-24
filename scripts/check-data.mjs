// Runs before every build. If bouquets.json or prices.json has a mistake, the
// build stops with a plain message and the live site keeps its previous version.
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const problems = [];
const fail = (msg) => problems.push(msg);

function load(file) {
  try {
    return JSON.parse(readFileSync(new URL(file, root), 'utf8'));
  } catch (e) {
    console.error(`\n✖ ${file} is not valid JSON. Check for a missing comma, quote or bracket.\n  ${e.message}\n`);
    process.exit(1);
  }
}

const isPrice = (n) => Number.isInteger(n) && n >= 0;
const FOCUS = ['top', 'bottom', 'left', 'right', 'center'];

// ---- bouquets.json
const cat = load('src/data/bouquets.json');
if (!Array.isArray(cat.occasions) || !cat.occasions.length) fail('bouquets.json: the "occasions" list is missing.');
if (!Array.isArray(cat.bouquets) || !cat.bouquets.length) fail('bouquets.json: the "bouquets" list is missing or empty.');
const seen = new Set();
for (const [i, b] of (cat.bouquets ?? []).entries()) {
  const label = b.name ? `"${b.name}"` : `bouquet number ${i + 1}`;
  if (typeof b.id !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(b.id))
    fail(`${label}: "id" must be lowercase words joined by dashes, like "pink-roses-50".`);
  else if (seen.has(b.id)) fail(`${label}: the id "${b.id}" is used twice. Each bouquet needs its own id.`);
  seen.add(b.id);
  if (!b.name) fail(`bouquet number ${i + 1} has no "name".`);
  if (!isPrice(b.price)) fail(`${label}: price ${JSON.stringify(b.price)} should be a whole number like 3500 (no commas or quotes).`);
  if (!b.description) fail(`${label}: add a "description".`);
  if (!Array.isArray(b.occasions) || !b.occasions.length) fail(`${label}: "occasions" needs at least one, like ["Birthday"].`);
  else
    for (const o of b.occasions)
      if (!cat.occasions.includes(o)) fail(`${label}: occasion "${o}" is not in the occasions list (${cat.occasions.join(', ')}).`);
  if ('bestseller' in b && typeof b.bestseller !== 'boolean') fail(`${label}: "bestseller" must be true or false.`);
  if ('focus' in b && !FOCUS.includes(b.focus)) fail(`${label}: "focus" must be one of ${FOCUS.join(', ')}.`);
  if ('zoom' in b && !(typeof b.zoom === 'number' && b.zoom >= 1 && b.zoom <= 4)) fail(`${label}: "zoom" must be a number from 1 to 4, like 1.5.`);
  const curated = existsSync(new URL(`public/images/${b.id}.jpg`, root));
  if (b.photo) {
    if (!existsSync(new URL(`photos/${b.photo}`, root)))
      fail(`${label}: photo "${b.photo}" was not found in the photos folder. Check the exact file name, including .jpeg or .jpg.`);
  } else if (!curated) fail(`${label}: no photo. Upload one to the photos folder and add "photo": "<file name>".`);
}

// ---- prices.json
const pr = load('src/data/prices.json');
for (const key of ['addOns', 'deliveryAreas', 'subscriptions'])
  if (!Array.isArray(pr[key])) fail(`prices.json: the "${key}" list is missing.`);
for (const a of pr.addOns ?? []) {
  if (!a.id || !a.name) fail(`prices.json: an add-on is missing its "id" or "name": ${JSON.stringify(a)}`);
  if (!isPrice(a.price)) fail(`prices.json: add-on "${a.name}" price should be a whole number like 1200.`);
}
const addOnIds = (pr.addOns ?? []).map((a) => a.id);
const dupAddOn = addOnIds.find((id, i) => addOnIds.indexOf(id) !== i);
if (dupAddOn) fail(`prices.json: add-on id "${dupAddOn}" is used twice.`);
for (const d of pr.deliveryAreas ?? []) {
  if (!d.area) fail(`prices.json: a delivery area is missing its "area": ${JSON.stringify(d)}`);
  if (!isPrice(d.fee)) fail(`prices.json: "${d.area}" fee should be a whole number like 300.`);
  if (typeof d.sameDay !== 'boolean') fail(`prices.json: "${d.area}" sameDay must be true or false.`);
}
for (const s of pr.subscriptions ?? [])
  if (!isPrice(s.price)) fail(`prices.json: plan "${s.plan}" price should be a whole number.`);

if (problems.length) {
  console.error(`\n✖ Not published. Please fix:\n${problems.map((p) => `  • ${p}`).join('\n')}\n`);
  process.exit(1);
}
console.log(
  `✓ Data OK: ${cat.bouquets.length} bouquets, ${pr.addOns.length} add-ons, ${pr.deliveryAreas.length} delivery areas, ${pr.subscriptions.length} plans`,
);
