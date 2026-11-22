export interface Zone {
  name: string;
  fee: number; // KSh
  sameDay: boolean;
}

// Delivery fees by area. Adjust to match your rider costs.
export const ZONES: Zone[] = [
  { name: 'CBD', fee: 0, sameDay: true },
  { name: 'Upper Hill', fee: 200, sameDay: true },
  { name: 'Ngara / Pangani', fee: 250, sameDay: true },
  { name: 'Parklands', fee: 300, sameDay: true },
  { name: 'Westlands', fee: 300, sameDay: true },
  { name: 'Kilimani', fee: 300, sameDay: true },
  { name: 'Hurlingham', fee: 300, sameDay: true },
  { name: 'Lavington', fee: 350, sameDay: true },
  { name: 'Kileleshwa', fee: 350, sameDay: true },
  { name: 'South B / South C', fee: 350, sameDay: true },
  { name: 'Langata', fee: 450, sameDay: true },
  { name: 'Gigiri / UN', fee: 450, sameDay: true },
  { name: 'Kasarani / Roysambu', fee: 450, sameDay: true },
  { name: 'Embakasi / JKIA', fee: 500, sameDay: true },
  { name: 'Runda', fee: 500, sameDay: true },
  { name: 'Ruaka', fee: 500, sameDay: true },
  { name: 'Karen', fee: 550, sameDay: true },
  { name: 'Kitengela', fee: 900, sameDay: false },
  { name: 'Ngong / Rongai', fee: 800, sameDay: false },
  { name: 'Thika Road (beyond Ruiru)', fee: 900, sameDay: false },
];

export const ksh = (n: number) => `KSh ${n.toLocaleString('en-KE')}`;
