import { SHOP } from '../config';

const tel = (p: string) => `tel:${p.replace(/\s/g, '')}`;

export default function Footer() {
  return (
    <footer className="footer" id="visit">
      <div className="footer-grid">
        <div>
          <img src="./images/logo-small.png" alt={`${SHOP.name} logo`} width="96" height="96" className="footer-logo" />
          <p className="logo-name">{SHOP.name}</p>
          <p className="footer-tag">{SHOP.tagline}, made by hand in Nairobi.</p>
        </div>
        <div>
          <h3>Visit the shop</h3>
          <p><a href={SHOP.mapUrl} target="_blank" rel="noreferrer">{SHOP.address}</a></p>
          <p>{SHOP.hours}</p>
        </div>
        <div>
          <h3>Call or WhatsApp</h3>
          {SHOP.phones.map((p) => (
            <p key={p}><a href={tel(p)}>{p}</a></p>
          ))}
          <p><a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
        </div>
        <div>
          <h3>Follow us</h3>
          <p>
            <a href={`https://instagram.com/${SHOP.instagramHandle}`} target="_blank" rel="noreferrer">
              Instagram @{SHOP.instagramHandle}
            </a>
          </p>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} {SHOP.name}, Nairobi.</p>
    </footer>
  );
}
