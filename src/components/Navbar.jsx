import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import Logo from './ui/Logo';
import Button from './ui/Button';
import { NAV_LINKS } from '../data/site';
import { useCart } from '../context/CartContext';

const linkCls = 'text-base font-medium text-muted md:text-[15px] transition-colors hover:text-ink';

function NavItem({ item, className = linkCls, activeClass = '!text-ink', onClick }) {
  if (item.href) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{item.label}</a>;
  }
  return (
    <NavLink to={item.to} onClick={onClick} className={({ isActive }) => `${className} ${isActive ? activeClass : ''}`}>
      {item.label}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-[25px]">
      <div className="mx-auto flex h-[72px] max-w-page items-center justify-between px-5 md:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => <NavItem key={l.label} item={l} />)}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`} className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-surface">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[12px] font-medium text-white">{count}</span>
            )}
          </Link>
          <Button to="/shop" variant="outline" className="hidden sm:inline-flex">Shop</Button>
          <button type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-drawer" onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Portal: the header's backdrop-blur creates a containing block that would squash a fixed menu into the 72px bar */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.aside
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col overflow-y-auto bg-[#0b0b0b] px-6 pb-8 text-white md:hidden"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-[72px] shrink-0 items-center justify-between">
                <Link to="/" aria-label="Odour Elixirs — home" onClick={() => setOpen(false)} className="inline-flex items-center">
                  <img src="/assets/Logos/OE_White.svg" alt="Odour Elixirs" className="h-9 w-auto" />
                </Link>
                <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              <div className="h-px w-full bg-white/10" />

              <nav aria-label="Mobile" className="mt-8 flex flex-1 flex-col justify-center">
                {[...NAV_LINKS, { label: 'Cart', to: '/cart' }].map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-white/10"
                  >
                    <NavItem
                      item={l}
                      onClick={() => setOpen(false)}
                      activeClass="!text-white"
                      className="flex items-baseline gap-4 py-4 font-serif text-[34px] leading-none text-white/90 transition-colors hover:text-white"
                    />
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-8 shrink-0"
              >
                <Button to="/shop" className="w-full !bg-white !text-ink hover:!bg-neutral-200">Shop the Collection</Button>
                <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-white/40">The Art of Leaving a Trace</p>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
