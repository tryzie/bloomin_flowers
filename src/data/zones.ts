import prices from './prices.json';

export interface Zone {
  name: string;
  fee: number; // KSh
  sameDay: boolean;
}

// Delivery fees by area, from prices.json.
export const ZONES: Zone[] = prices.deliveryAreas.map((d) => ({ name: d.area, fee: d.fee, sameDay: d.sameDay }));

export const ksh = (n: number) => `KSh ${n.toLocaleString('en-KE')}`;
