import { useCallback, useState } from 'react';
import CartDrawer from './components/CartDrawer';
import Delivery from './components/Delivery';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Shop from './components/Shop';
import Subscriptions from './components/Subscriptions';
import WhatsAppFab from './components/WhatsAppFab';
import { useCart } from './hooks/useCart';

export default function App() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const close = useCallback(() => setOpen(false), []);

  const addFromShop = (id: string) => {
    cart.add(id);
    setToast('Added to basket');
    window.setTimeout(() => setToast(''), 1800);
  };

  return (
    <>
      <Header count={cart.count} onCart={() => setOpen(true)} />
      <main>
        <Hero />
        <Shop lines={cart.lines} onAdd={addFromShop} />
        <Delivery />
        <Subscriptions />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFab />
      <CartDrawer open={open} onClose={close} {...cart} />
      <div className="toast" role="status" data-show={!!toast}>
        {toast} <button onClick={() => setOpen(true)}>View basket</button>
      </div>
    </>
  );
}
