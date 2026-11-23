import prices from './prices.json';

export type Occasion = 'Love' | 'Birthday' | 'Graduation' | 'Get well' | 'Money & treats' | 'For him' | 'Just because';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // KSh
  occasions: Occasion[];
  stems: string;
  // Petal colours for the illustrated fallback, used only when there is no photo.
  colors: string[];
  image?: string; // square photo in /public/images
  bestseller?: boolean;
}

export const OCCASIONS: Occasion[] = ['Love', 'Birthday', 'Graduation', 'Get well', 'Money & treats', 'For him', 'Just because'];

// Bouquet details and photos. Prices and names live in prices.json.
const DETAILS: Omit<Product, 'price'>[] = [
  {
    id: 'red-velvet-cloud',
    name: 'Red Velvet Cloud',
    description: 'Deep red roses framed by a full ring of baby’s breath, in blush wrap. Add a ribbon with your own words.',
    occasions: ['Love', 'Birthday'],
    stems: 'About 100 roses',
    colors: ['#A81B31'],
    image: './images/red-velvet-cloud.jpg',
    bestseller: true,
  },
  {
    id: 'butterfly-kisses',
    name: 'Butterfly Kisses',
    description: 'A heart of pink roses inside a sea of red, finished with gold butterflies and a name ribbon.',
    occasions: ['Birthday', 'Love'],
    stems: 'About 150 roses',
    colors: ['#C8243C', '#F4A6B8'],
    image: './images/butterfly-kisses.jpg',
    bestseller: true,
  },
  {
    id: 'lilac-money',
    name: 'Lilac Money Bouquet',
    description: 'Lilac roses mixed with folded banknotes in purple wrap. Tell us the cash amount and we build it in.',
    occasions: ['Money & treats', 'Birthday', 'Graduation'],
    stems: 'Roses + your cash amount',
    colors: ['#C9A0C8'],
    image: './images/lilac-money.jpg',
    bestseller: true,
  },
  {
    id: 'classic-reds',
    name: 'Classic Reds',
    description: 'Fifty dark red roses in crisp white wrap. Simple, bold, always right.',
    occasions: ['Love', 'Just because'],
    stems: '50 roses',
    colors: ['#A81B31'],
    image: './images/classic-reds.jpg',
    bestseller: true,
  },
  {
    id: 'black-tie-reds',
    name: 'Black Tie Reds',
    description: 'A grand dome of red roses in black wrap with a satin ribbon carrying your message.',
    occasions: ['Love', 'Birthday'],
    stems: 'About 100 roses',
    colors: ['#C8243C'],
    image: './images/black-tie-reds.jpg',
  },
  {
    id: 'midnight-garden',
    name: 'Midnight Garden',
    description: 'Dark burgundy roses, a baby’s breath border and black wrap. Comes with a personalised ribbon.',
    occasions: ['Birthday', 'Love'],
    stems: 'About 100 roses',
    colors: ['#7A1028'],
    image: './images/midnight-garden.jpg',
  },
  {
    id: 'snow-halo',
    name: 'Snow Halo',
    description: 'Red roses wrapped in a thick halo of baby’s breath and white paper. Lovely for congratulations.',
    occasions: ['Graduation', 'Love'],
    stems: 'About 60 roses',
    colors: ['#A81B31', '#FFFFFF'],
    image: './images/snow-halo.jpg',
  },
  {
    id: 'ribbon-of-love',
    name: 'Ribbon of Love',
    description: 'Bright red roses in white and black wrap, finished with a red ribbon in your words.',
    occasions: ['Love'],
    stems: 'About 80 roses',
    colors: ['#D9384F'],
    image: './images/ribbon-of-love.jpg',
  },
  {
    id: 'mixed-blush',
    name: 'Mixed Blush',
    description: 'Red, peach and cream roses with baby’s breath, in patterned white wrap.',
    occasions: ['Birthday', 'Just because'],
    stems: 'About 70 roses',
    colors: ['#A81B31', '#F4B6A0', '#FFF6E0'],
    image: './images/mixed-blush.jpg',
  },
  {
    id: 'roses-and-wine',
    name: 'Roses & Wine',
    description: 'Pink and red roses with baby’s breath in black wrap, delivered with a bottle of wine.',
    occasions: ['Love', 'Birthday'],
    stems: 'About 70 roses + wine',
    colors: ['#E0457B'],
    image: './images/roses-and-wine.jpg',
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Orange roses ringed with baby’s breath in white marble wrap. Warm, cheerful and bright.',
    occasions: ['Birthday', 'Just because'],
    stems: 'About 60 roses',
    colors: ['#E8822F'],
    image: './images/sunset-orange.jpg',
  },
  {
    id: 'pink-petite',
    name: 'Pink Petite',
    description: 'A neat, round bouquet of pink roses with a black ribbon.',
    occasions: ['Love', 'Birthday', 'Just because'],
    stems: 'About 50 roses',
    colors: ['#EE8FA6'],
    image: './images/pink-petite.jpg',
  },
  {
    id: 'velvet-dozen',
    name: 'Velvet Dozen',
    description: 'Large-headed red roses in black lace-pattern wrap.',
    occasions: ['Love', 'Just because'],
    stems: '24 roses',
    colors: ['#C8243C'],
    image: './images/velvet-dozen.jpg',
  },
  {
    id: 'lavender-dreams',
    name: 'Lavender Dreams',
    description: 'Pink roses and purple asters in lilac wrap. Soft, full and pretty.',
    occasions: ['Birthday', 'Just because'],
    stems: 'About 40 stems',
    colors: ['#9C82C8', '#F4A6B8'],
    image: './images/lavender-dreams.jpg',
  },
  {
    id: 'garden-party',
    name: 'Garden Party',
    description: 'White chrysanthemums, purple carnations and pink roses in white wrap.',
    occasions: ['Birthday', 'Get well', 'Just because'],
    stems: 'About 45 stems',
    colors: ['#FFFFFF', '#8E2A6A', '#E0457B'],
    image: './images/garden-party.jpg',
  },
  {
    id: 'sweet-pink',
    name: 'Sweet Pink',
    description: 'Pink roses and white chrysanthemums with a pink ribbon in your words.',
    occasions: ['Birthday', 'Love'],
    stems: 'About 40 stems',
    colors: ['#EE8FA6', '#FFFFFF'],
    image: './images/sweet-pink.jpg',
  },
  {
    id: 'get-well-lilies',
    name: 'Get Well Lilies',
    description: 'Lilies, pink roses and chrysanthemums with a “Get Well Soon” ribbon.',
    occasions: ['Get well'],
    stems: 'About 35 stems',
    colors: ['#FFFFFF', '#EE8FA6'],
    image: './images/get-well-lilies.jpg',
  },
  {
    id: 'flame-lilies',
    name: 'Flame Lilies',
    description: 'Red roses and lilies in bold orange wrap. Big colour for a big day.',
    occasions: ['Birthday', 'Get well'],
    stems: 'About 30 stems',
    colors: ['#C8243C', '#E8822F'],
    image: './images/flame-lilies.jpg',
  },
  {
    id: 'graduation-gold',
    name: 'Graduation Gold',
    description: 'Yellow and red roses with white chrysanthemums, a mini graduation cap and a congratulations ribbon.',
    occasions: ['Graduation'],
    stems: 'About 50 stems',
    colors: ['#F5C443', '#A81B31', '#FFFFFF'],
    image: './images/graduation-gold.jpg',
  },
  {
    id: 'chocolate-cash',
    name: 'Chocolate & Cash',
    description: 'Pink roses, Cadbury and Galaxy chocolates and a fan of banknotes in pink wrap.',
    occasions: ['Money & treats', 'Birthday'],
    stems: 'Roses, chocolates + your cash amount',
    colors: ['#F4A6B8'],
    image: './images/chocolate-cash.jpg',
  },
  {
    id: 'kinder-treats',
    name: 'Kinder Treats',
    description: 'Kinder Joy, crisps and chocolates with blue baby’s breath and banknotes. A favourite for kids and teens.',
    occasions: ['Money & treats', 'Birthday'],
    stems: 'Treats + your cash amount',
    colors: ['#9EC9E8'],
    image: './images/kinder-treats.jpg',
  },
  {
    id: 'gentlemans-gift',
    name: 'Gentleman’s Gift',
    description: 'A gift bouquet for him: a T-shirt, socks and accessories arranged with baby’s breath. Tell us his size.',
    occasions: ['For him', 'Birthday'],
    stems: 'Clothing gift bouquet',
    colors: ['#2B1F24'],
    image: './images/gentlemans-gift.jpg',
  },
];

const bouquetPrices = new Map(prices.bouquets.map((b) => [b.id, b]));

// Name and price come from prices.json. Bouquets without a price entry are not shown.
export const PRODUCTS: Product[] = DETAILS.flatMap((d) => {
  const entry = bouquetPrices.get(d.id);
  return entry ? [{ ...d, name: entry.name, price: entry.price }] : [];
});

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export const ADD_ONS: AddOn[] = prices.addOns;
