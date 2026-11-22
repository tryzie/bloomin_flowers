import { SHOP } from '../config';
import { ksh } from '../data/zones';

const PLANS = [
  { name: 'Home', price: 2500, every: 'week', detail: 'A fresh seasonal hand-tie every Friday, ready for the weekend.' },
  { name: 'Office reception', price: 9000, every: 'week', detail: 'A tall arrangement, vase included. We swap it every Monday morning.' },
  { name: 'Monthly treat', price: 3200, every: 'month', detail: 'One surprise bouquet a month for someone you love, on a date you choose.' },
];

export default function Subscriptions() {
  const ask = (plan: string) =>
    `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(`Hi ${SHOP.name}, I'd like to start the ${plan} flower subscription.`)}`;

  return (
    <section className="section subs" id="subscriptions">
      <div className="section-head">
        <h2>Fresh flowers, on repeat</h2>
        <p>Pause or cancel any time with a WhatsApp message. Delivery included within Nairobi.</p>
      </div>
      <div className="plans">
        {PLANS.map((p) => (
          <div className="plan" key={p.name}>
            <h3>{p.name}</h3>
            <p className="plan-price">
              {ksh(p.price)} <span>/ {p.every}</span>
            </p>
            <p>{p.detail}</p>
            <a className="btn btn-ghost" href={ask(p.name)} target="_blank" rel="noreferrer">
              Start {p.name.toLowerCase()} plan
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
