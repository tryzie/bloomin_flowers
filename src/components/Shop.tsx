import { useMemo, useState } from 'react';
import { OCCASIONS, PRODUCTS, type Occasion } from '../data/products';
import type { CartLine } from '../hooks/useCart';
import ProductCard from './ProductCard';

type Sort = 'popular' | 'low' | 'high';

const MAX_PRICE = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 500) * 500;

interface Props {
  lines: CartLine[];
  onAdd: (id: string) => void;
}

export default function Shop({ lines, onAdd }: Props) {
  const [occasion, setOccasion] = useState<Occasion | 'All'>('All');
  const [sort, setSort] = useState<Sort>('popular');
  const [budget, setBudget] = useState(MAX_PRICE);

  const visible = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) => (occasion === 'All' || p.occasions.includes(occasion)) && p.price <= budget,
    );
    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price);
    return [...list].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
  }, [occasion, sort, budget]);

  return (
    <section className="section" id="shop">
      <div className="section-head">
        <h2>Bouquets for every reason</h2>
        <p>Every bouquet is made to order on the day it is delivered.</p>
      </div>

      <div className="filters">
        <div className="chips" role="group" aria-label="Filter by occasion">
          {(['All', ...OCCASIONS] as const).map((o) => (
            <button key={o} className="chip" aria-pressed={occasion === o} onClick={() => setOccasion(o)}>
              {o}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="budget">
            Up to <strong>KSh {budget.toLocaleString('en-KE')}</strong>
            <input
              type="range"
              min={1500}
              max={MAX_PRICE}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </label>
          <label className="sort">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="popular">Most loved</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <p>No bouquets match that budget and occasion.</p>
          <button className="btn btn-ghost" onClick={() => { setOccasion('All'); setBudget(MAX_PRICE); }}>
            Show all bouquets
          </button>
        </div>
      ) : (
        <div className="grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} inCart={lines.find((l) => l.id === p.id)?.qty ?? 0} />
          ))}
        </div>
      )}
    </section>
  );
}
