export type Occasion = 'Birthday' | 'Love' | 'Sympathy' | 'Just because' | 'Corporate';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // KSh
  occasions: Occasion[];
  stems: string;
  // Petal colours for the illustrated bouquet. Replace with `image` once you have photos.
  colors: string[];
  image?: string; // e.g. './images/naivasha-blush.jpg' placed in /public/images
  bestseller?: boolean;
}
// Photos live in /public/images. Replace illustrated bouquets by adding `image` to them.

export const OCCASIONS: Occasion[] = ['Birthday', 'Love', 'Sympathy', 'Just because', 'Corporate'];

export const PRODUCTS: Product[] = [
  {
    id: 'red-white-grandeur',
    name: 'Red & White Grandeur',
    description: 'A heart of red roses ringed with white roses and a cloud of baby’s breath, in a black wrap.',
    price: 9500,
    occasions: ['Love', 'Birthday'],
    stems: '100 roses',
    colors: ['#C8243C', '#FFFFFF'],
    image: './images/red-white-grandeur.jpg',
    bestseller: true,
  },
  {
    id: 'money-bouquet',
    name: 'Money Bouquet',
    description: 'Pink roses and baby’s breath framed by folded banknotes. Tell us the cash amount and we build it in.',
    price: 4500,
    occasions: ['Birthday', 'Love'],
    stems: 'Roses + your cash amount',
    colors: ['#F4A6B8', '#9FC2A8'],
    image: './images/money-bouquet.jpg',
    bestseller: true,
  },
  {
    id: 'crimson-peach',
    name: 'Crimson & Peach',
    description: 'Red and peach roses with baby’s breath, wrapped in white. Our everyday favourite.',
    price: 5500,
    occasions: ['Love', 'Birthday', 'Just because'],
    stems: '50 roses',
    colors: ['#C8243C', '#F4B6A0'],
    image: './images/crimson-peach.jpg',
    bestseller: true,
  },
  {
    id: 'pink-romance',
    name: 'Pink Romance',
    description: 'Twenty-four soft pink Kenyan roses, hand-tied and wrapped in blush paper.',
    price: 3500,
    occasions: ['Love', 'Birthday'],
    stems: '24 roses',
    colors: ['#F4A6B8', '#EE8FA6', '#F7C1CE'],
  },
  {
    id: 'blush-and-ivory',
    name: 'Blush & Ivory',
    description: 'Pink and ivory roses with spray roses and baby’s breath, wrapped in white.',
    price: 4200,
    occasions: ['Just because', 'Birthday'],
    stems: '18 stems',
    colors: ['#F4C6D2', '#FFFFFF', '#E8A3B5'],
  },
  {
    id: 'savannah-sun',
    name: 'Savannah Sun',
    description: 'Sunflowers and orange spray roses — loud, warm and impossible to ignore.',
    price: 2800,
    occasions: ['Birthday', 'Just because'],
    stems: '12 stems',
    colors: ['#F2A93B', '#F5C443', '#E8822F'],
  },
  {
    id: 'red-classic',
    name: 'The Red Classic',
    description: 'Fifty long-stem red roses. For when "I love you" needs to be very clear.',
    price: 6500,
    occasions: ['Love'],
    stems: '50 roses',
    colors: ['#C8243C', '#A81B31', '#D9384F'],
  },
  {
    id: 'with-sympathy',
    name: 'With Sympathy',
    description: 'White lilies, roses and chrysanthemums. A gentle way to say we are thinking of you.',
    price: 4800,
    occasions: ['Sympathy'],
    stems: '20 stems',
    colors: ['#FFFFFF', '#F3F0E8', '#E8EEE4'],
  },
  {
    id: 'garden-mix',
    name: 'Garden Mix',
    description: 'A loose, garden-style mix of seasonal blooms, picked fresh that morning.',
    price: 3900,
    occasions: ['Just because', 'Love'],
    stems: '20 stems',
    colors: ['#F4A6B8', '#F5C443', '#C8243C', '#FFFFFF'],
  },
  {
    id: 'petite-posy',
    name: 'Petite Posy',
    description: 'A small, cheerful hand-tie. Perfect with coffee or as a desk surprise.',
    price: 1500,
    occasions: ['Just because', 'Birthday'],
    stems: '8 stems',
    colors: ['#EE8FA6', '#F5C443'],
  },
  {
    id: 'boardroom',
    name: 'Boardroom Arrangement',
    description: 'A tall reception arrangement in a ceramic vase. Refreshed weekly on subscription.',
    price: 7500,
    occasions: ['Corporate'],
    stems: '35 stems',
    colors: ['#FFFFFF', '#E8A3B5', '#C8243C'],
  },
  {
    id: 'mamas-favourite',
    name: 'Mama’s Favourite',
    description: 'Carnations and alstroemeria in her favourite colours. Lasts up to two weeks.',
    price: 2400,
    occasions: ['Birthday', 'Love'],
    stems: '15 stems',
    colors: ['#E8822F', '#F4A6B8', '#F7C1CE'],
  },
];

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export const ADD_ONS: AddOn[] = [
  { id: 'cake', name: 'Mini cake (Black Forest)', price: 1800 },
  { id: 'chocs', name: 'Box of chocolates', price: 1200 },
  { id: 'teddy', name: 'Teddy bear', price: 1500 },
  { id: 'vase', name: 'Glass vase', price: 800 },
];
