import { SHOP } from '../config';
import { ksh } from '../data/zones';
import prices from '../data/prices.json';

const DETAILS: Record<string, string> = {
  Home: 'A fresh seasonal hand-tie every Friday, ready for the weekend.',
  'Office reception': 'A tall arrangement, vase included. We swap it every Monday morning.',
  'Monthly treat': 'One surprise bouquet a month for someone you love, on a date you choose.',
};

// Plan prices come from prices.json.
const PLANS = prices.subscriptions.map((s) => ({ name: s.plan, price: s.price, every: s.every, detail: DETAILS[s.plan] ?? '' }));

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
