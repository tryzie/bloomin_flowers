import { SHOP } from '../config';

const FAQS = [
  {
    q: 'How late can I order for same-day delivery?',
    a: `Order before ${SHOP.sameDayCutoff} and we deliver the same day anywhere in Nairobi. After that, we deliver the next morning.`,
  },
  {
    q: 'How do I pay?',
    a: 'Send your order on WhatsApp and we will confirm availability, the total and how to pay. You can also pay in person at the shop.',
  },
  {
    q: 'Can I send flowers without the recipient knowing it is me?',
    a: 'Yes. Leave the sender name off the card and we will keep it anonymous.',
  },
  {
    q: 'What if the recipient is not home?',
    a: 'Our rider calls the recipient first. If no one is in, we leave the flowers with the guard or reception and send you a photo.',
  },
  {
    q: 'Do you do weddings and events?',
    a: 'Yes, from small nikah and ruracio set-ups to full receptions. Send us your date and colours on WhatsApp for a quote.',
  },
  {
    q: 'How long will my flowers last?',
    a: 'Roses last 7–10 days if you trim the stems and change the water every two days. Each bouquet comes with a flower food sachet.',
  },
];

export default function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="section-head">
        <h2>Questions we get a lot</h2>
      </div>
      <div className="faq-list">
        {FAQS.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
