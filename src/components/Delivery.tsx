import { useState } from 'react';
import { SHOP } from '../config';
import { ZONES, ksh } from '../data/zones';

export default function Delivery() {
  const [zone, setZone] = useState('');
  const z = ZONES.find((x) => x.name === zone);

  return (
    <section className="section delivery" id="delivery">
      <div className="delivery-grid">
        <div>
          <h2>Where do we deliver?</h2>
          <p>
            Everywhere in Nairobi and the nearby towns. Our riders leave our Koinange Street shop every two hours from 9am. Pick an
            area to see the fee.
          </p>
          <label className="zone-pick">
            Delivery area
            <select value={zone} onChange={(e) => setZone(e.target.value)}>
              <option value="">Choose an area…</option>
              {ZONES.map((x) => (
                <option key={x.name} value={x.name}>{x.name}</option>
              ))}
            </select>
          </label>
          <div className="zone-result" aria-live="polite">
            {z ? (
              <>
                <p className="zone-fee">{z.fee === 0 ? 'Free delivery' : ksh(z.fee)}</p>
                <p>
                  {z.sameDay
                    ? `Same-day delivery to ${z.name} when you order before ${SHOP.sameDayCutoff}.`
                    : `Next-day delivery to ${z.name}. Order by 6pm for tomorrow.`}
                </p>
              </>
            ) : (
              <p className="muted">Can’t find your area? Message us on WhatsApp and we’ll quote you.</p>
            )}
          </div>
        </div>
        <ol className="steps">
          <li>
            <h3>Choose your flowers</h3>
            <p>Add bouquets and extras like cake or chocolates to your basket.</p>
          </li>
          <li>
            <h3>Send your order on WhatsApp</h3>
            <p>Your basket, recipient and card message arrive with us in one tap.</p>
          </li>
          <li>
            <h3>We confirm your order</h3>
            <p>We reply with your total, delivery time and how to pay. Questions? Call {SHOP.phones[0]}.</p>
          </li>
          <li>
            <h3>We deliver and send a photo</h3>
            <p>You get a picture of the bouquet before it leaves, and a message when it arrives.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
