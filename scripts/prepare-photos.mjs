// For each bouquet with a "photo" in the photos folder and no ready-made image,
// crop the photo to a square around the bouquet and save it as
// public/images/<id>.jpg (900 x 900, compressed for mobile data).
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const path = (p) => fileURLToPath(new URL(p, root));
const { bouquets } = JSON.parse(readFileSync(path('src/data/bouquets.json'), 'utf8'));
mkdirSync(path('public/images/'), { recursive: true });

const POSITION = { top: 'top', bottom: 'bottom', left: 'left', right: 'right', center: 'centre' };
let made = 0;
for (const b of bouquets) {
  const out = path(`public/images/${b.id}.jpg`);
  if (existsSync(out) || !b.photo) continue;
  // Respect the phone's orientation first, so width/height are the real ones.
  const { data, info } = await sharp(path(`photos/${b.photo}`)).rotate().toBuffer({ resolveWithObject: true });
  let img = sharp(data);
  if (b.zoom && b.zoom > 1) {
    // Zoom in on part of the photo: a square 1/zoom of the short side,
    // centred, or nudged towards the "focus" side.
    const side = Math.round(Math.min(info.width, info.height) / b.zoom);
    const fx = { left: 0.35, right: 0.65 }[b.focus] ?? 0.5;
    const fy = { top: 0.35, bottom: 0.65 }[b.focus] ?? 0.5;
    const clamp = (v, max) => Math.min(Math.max(Math.round(v), 0), max);
    img = img.extract({
      left: clamp(info.width * fx - side / 2, info.width - side),
      top: clamp(info.height * fy - side / 2, info.height - side),
      width: side,
      height: side,
    });
  }
  await img
    .resize(900, 900, { fit: 'cover', position: b.focus ? POSITION[b.focus] : sharp.strategy.attention })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(out);
  console.log(`  cropped ${b.photo} → images/${b.id}.jpg`);
  made++;
}
console.log(`✓ Photos ready (${made} new crop${made === 1 ? '' : 's'})`);
