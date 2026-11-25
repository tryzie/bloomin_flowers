import { track } from '../analytics';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SHOP } from '../config';
import { ADD_ONS, PRODUCTS } from '../data/products';
import { OTHER_AREA, ZONES, ksh } from '../data/zones';
import type { CartLine } from '../hooks/useCart';

interface Props {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const ITEMS = [...PRODUCTS.map((p) => ({ id: p.id, name: p.name, price: p.price })), ...ADD_ONS];

function localDateISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function CartDrawer({ open, onClose, lines, add, setQty, clear }: Props) {
  const [zone, setZone] = useState('');
  const [otherArea, setOtherArea] = useState('');
  const [date, setDate] = useState(localDateISO(0));
  const [recipient, setRecipient] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [landmark, setLandmark] = useState('');
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [error, setError] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const rows = lines
    .map((l) => ({ ...l, item: ITEMS.find((i) => i.id === l.id) }))
    .filter((r): r is CartLine & { item: (typeof ITEMS)[number] } => !!r.item);

  const subtotal = rows.reduce((s, r) => s + r.item.price * r.qty, 0);
  const z = ZONES.find((x) => x.name === zone);
  const isOther = zone === OTHER_AREA;
  const fee = z?.fee ?? 0; // "Other area" has no fixed fee; the shop quotes it
  const total = subtotal + fee;
  const feeLabel = isOther ? 'To be confirmed' : zone ? (fee === 0 ? 'Free' : ksh(fee)) : '—';
  const hasFlowers = rows.some((r) => PRODUCTS.some((p) => p.id === r.id));

  const orderText = useMemo(() => {
    const items = rows.map((r) => `• ${r.qty} × ${r.item.name} — ${ksh(r.item.price * r.qty)}`).join('\n');
    return [
      `Hi ${SHOP.name}, I'd like to order:`,
      items,
      '',
      isOther
        ? `Delivery: ${otherArea.trim()} (other area, please quote the delivery fee) on ${date}`
        : `Delivery: ${zone} (${fee === 0 ? 'free' : ksh(fee)}) on ${date}`,
      `Recipient: ${recipient} ${recipientPhone}`,
      landmark ? `Location / landmark: ${landmark}` : null,
      message ? `Card message: "${message}"` : null,
      `From: ${sender || 'Anonymous'}`,
      '',
      isOther ? `Total: ${ksh(total)} + delivery fee` : `Total: ${ksh(total)}`,
      'Please confirm availability and payment details.',
    ]
      .filter((x) => x !== null)
      .join('\n');
  }, [rows, zone, isOther, otherArea, fee, date, recipient, recipientPhone, landmark, message, sender, total]);

  const sendOrder = () => {
    if (!hasFlowers) return setError('Add at least one bouquet to your basket.');
    if (!zone) return setError('Choose a delivery area.');
    if (isOther && !otherArea.trim()) return setError('Type the delivery area, for example Syokimau or Kikuyu.');
    if (!recipient.trim() || !/^(\+?254|0)[17]\d{8}$/.test(recipientPhone.replace(/\s/g, '')))
      return setError('Enter the recipient’s name and a Kenyan phone number, like 0712 345 678.');
    setError('');
    track('order-sent-whatsapp', isOther ? `other:${otherArea.trim().toLowerCase()}` : zone);
    window.open(`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(orderText)}`, '_blank', 'noopener');
  };

  return (
    <div className="drawer-wrap" data-open={open} aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your basket">
        <div className="drawer-head">
          <h2>Your basket</h2>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close basket">✕</button>
        </div>

        {rows.length === 0 ? (
          <div className="drawer-empty">
            <p>Your basket is empty.</p>
            <a href="#shop" className="btn btn-primary" onClick={onClose}>Browse bouquets</a>
          </div>
        ) : (
          <div className="drawer-body">
            <ul className="lines">
              {rows.map((r) => (
                <li key={r.id}>
                  <span className="line-name">{r.item.name}</span>
                  <span className="qty">
                    <button onClick={() => setQty(r.id, r.qty - 1)} aria-label={`Remove one ${r.item.name}`}>−</button>
                    <span>{r.qty}</span>
                    <button onClick={() => setQty(r.id, r.qty + 1)} aria-label={`Add one ${r.item.name}`}>+</button>
                  </span>
                  <span className="line-price">{ksh(r.item.price * r.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="addons">
              <p className="field-label">Add something extra</p>
              <div className="chips">
                {ADD_ONS.map((a) => (
                  <button key={a.id} className="chip" onClick={() => { add(a.id); track('add-extra', a.id); }}>
                    + {a.name} · {ksh(a.price)}
                  </button>
                ))}
              </div>
            </div>

            <div className="form">
              <label>
                Delivery area
                <select value={zone} onChange={(e) => setZone(e.target.value)}>
                  <option value="">Choose an area…</option>
                  {ZONES.map((x) => (
                    <option key={x.name} value={x.name}>
                      {x.name} — {x.fee === 0 ? 'Free' : ksh(x.fee)}
                    </option>
                  ))}
                  <option value={OTHER_AREA}>Other area — fee confirmed on WhatsApp</option>
                </select>
              </label>
              {isOther && (
                <label>
                  Which area?
                  <input value={otherArea} onChange={(e) => setOtherArea(e.target.value)} placeholder="e.g. Syokimau" autoFocus />
                </label>
              )}
              <label>
                Delivery date
                <input type="date" min={localDateISO(0)} value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label>
                Recipient’s name
                <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Wanjiku Kamau" />
              </label>
              <label>
                Recipient’s phone
                <input inputMode="tel" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} placeholder="0712 345 678" />
              </label>
              <label className="full">
                Building, estate or landmark
                <input value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="e.g. Riverside Apartments, Block C, next to Java" />
              </label>
              <label className="full">
                <span>Card message <span className="muted">(optional)</span></span>
                <textarea rows={3} maxLength={200} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Happy birthday, Mum!" />
              </label>
              <label className="full">
                <span>From <span className="muted">(leave blank to stay anonymous)</span></span>
                <input value={sender} onChange={(e) => setSender(e.target.value)} />
              </label>
            </div>

            <dl className="totals">
              <div><dt>Subtotal</dt><dd>{ksh(subtotal)}</dd></div>
              <div><dt>Delivery</dt><dd>{feeLabel}</dd></div>
              <div className="grand"><dt>Total</dt><dd>{isOther ? `${ksh(total)} + delivery` : ksh(total)}</dd></div>
            </dl>

            {error && <p className="error" role="alert">{error}</p>}

            <button className="btn btn-primary btn-block" onClick={sendOrder}>Send order on WhatsApp</button>
            <p className="pay-note">
              We’ll reply on WhatsApp to confirm your order, the delivery time and how to pay. Prefer to call?{' '}
              <a href={`tel:${SHOP.phones[0].replace(/\s/g, '')}`}>{SHOP.phones[0]}</a>
            </p>
            <button className="link-btn" onClick={clear}>Empty basket</button>
          </div>
        )}
      </aside>
    </div>
  );
}
