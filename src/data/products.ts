import catalogue from './bouquets.json';
import prices from './prices.json';

// All bouquet content lives in bouquets.json, so it can be edited on GitHub.
export type Occasion = string;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // KSh
  occasions: Occasion[];
  size: string;
  image: string;
  bestseller: boolean;
}

export const OCCASIONS: Occasion[] = catalogue.occasions;

export const PRODUCTS: Product[] = catalogue.bouquets.map((b) => ({
  id: b.id,
  name: b.name,
  description: b.description,
  price: b.price,
  occasions: b.occasions,
  size: b.size ?? '',
  // Curated or auto-cropped square photo, prepared by scripts/prepare-photos.mjs
  image: `./images/${b.id}.jpg`,
  bestseller: 'bestseller' in b && b.bestseller === true,
}));

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export const ADD_ONS: AddOn[] = prices.addOns;
