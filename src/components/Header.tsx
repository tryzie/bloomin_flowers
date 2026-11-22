import { SHOP } from '../config';

interface Props {
  count: number;
  onCart: () => void;
}

export default function Header({ count, onCart }: Props) {
  return (
    <header className="header">
      <a href="#top" className="logo">
        <img src="./images/logo-small.png" alt="" width="52" height="52" className="logo-img" />
        <span className="logo-text">
          <span className="logo-name">{SHOP.name}</span>
          <small>{SHOP.tagline}</small>
        </span>
      </a>
      <nav className="nav" aria-label="Main">
        <a href="#shop">Shop</a>
        <a href="#delivery">Delivery</a>
        <a href="#subscriptions">Subscriptions</a>
        <a href="#faq">FAQ</a>
        <a href="#visit">Visit us</a>
      </nav>
      <button className="cart-btn" onClick={onCart} aria-label={`Open basket, ${count} items`}>
        Basket
        <span className="cart-count" data-empty={count === 0}>{count}</span>
      </button>
    </header>
  );
}
