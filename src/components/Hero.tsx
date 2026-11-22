import { SHOP } from '../config';
import Petals from './Petals';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Petals />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-script">{SHOP.name}</p>
          <h1>Fresh roses and elegant arrangements, delivered across Nairobi.</h1>
          <p className="lede">
            Kenyan-grown flowers, arranged by hand at our shop on Koinange Street. Order before {SHOP.sameDayCutoff} for
            same-day delivery.
          </p>
          <div className="hero-actions">
            <a href="#shop" className="btn btn-primary">Shop bouquets</a>
            <a href={`https://wa.me/${SHOP.whatsapp}`} className="btn btn-ghost" target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          </div>
          <ul className="hero-facts">
            <li><strong>Same-day</strong> delivery in Nairobi</li>
            <li><strong>Free delivery</strong> within the CBD</li>
            <li><strong>Walk in</strong> at Cianda House</li>
          </ul>
        </div>
        <div className="hero-art">
          <div className="oval">
            <img src="./images/red-white-grandeur.jpg" alt="Bouquet of red and white roses with baby’s breath" />
          </div>
        </div>
      </div>
    </section>
  );
}
