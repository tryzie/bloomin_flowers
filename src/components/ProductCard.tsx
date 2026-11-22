import type { Product } from '../data/products';
import { ksh } from '../data/zones';
import Bouquet from './Bouquet';
import { SHOP } from '../config';

interface Props {
  product: Product;
  onAdd: (id: string) => void;
  inCart: number;
}

export default function ProductCard({ product, onAdd, inCart }: Props) {
  return (
    <article className="product">
      <div className="product-art">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <Bouquet seed={product.id} colors={product.colors} />
        )}
        {product.bestseller && <span className="badge">Bestseller</span>}
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <p className="product-meta">{product.stems}</p>
        <a
          className="ask"
          href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(`Hi ${SHOP.name}, I'm interested in the ${product.name} (${ksh(product.price)}). Is it available?`)}`}
          target="_blank"
          rel="noreferrer"
        >
          Ask about this on WhatsApp
        </a>
        <div className="product-foot">
          <span className="price">{ksh(product.price)}</span>
          <button className="btn btn-small" onClick={() => onAdd(product.id)}>
            {inCart > 0 ? `Add another (${inCart})` : 'Add to basket'}
          </button>
        </div>
      </div>
    </article>
  );
}
