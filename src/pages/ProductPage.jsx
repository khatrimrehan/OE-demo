import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import NotFound from './NotFound';
import useSEO from '../hooks/useSEO';
import { useCart } from '../context/CartContext';
import { getProductBySlug, MAX_QTY, PRODUCTS, SHIPPING_NOTE } from '../data/products';
import { formatINR } from '../lib/format';

export default function ProductPage({ slugOverride }) {
  const params = useParams();
  const product = getProductBySlug(slugOverride || params.slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [active, setActive] = useState(0);
  const touchX = useRef(null);

  // Reset to the first image when switching to another product
  useEffect(() => setActive(0), [product?.id]);

  useSEO(product?.name, product?.description);
  if (!product) return <NotFound />;

  const isSet = product.id === 'discovery-set';
  const gallery = product.images?.length ? product.images : [product.image];
  const go = (dir) => setActive((i) => (i + dir + gallery.length) % gallery.length);
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="mx-auto max-w-page px-5 py-10 md:px-8 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link to="/shop" className="hover:text-ink">Store</Link> / <span className="text-ink">{product.name}</span>
      </nav>
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
        <div
          className="mx-auto flex w-full max-w-[440px] flex-col-reverse gap-3 md:mx-0 md:flex-row"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'ArrowRight') go(1);
          }}
        >
          {/* Thumbnails: a column on the left (desktop) / a row under the image (mobile) */}
          {gallery.length > 1 && (
            <ul className="grid shrink-0 grid-cols-4 gap-2 md:w-[68px] md:grid-cols-1 md:content-start" aria-label="Product images">
              {gallery.map((src, i) => (
                <li key={src} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === active}
                    className={`block w-full overflow-hidden rounded-none border-2 bg-transparent transition-colors ${i === active ? 'border-ink' : 'border-line opacity-80 hover:opacity-100'}`}
                  >
                    <SmartImage src={src} alt="" ratio="3 / 4" className="!bg-transparent" imgClassName="object-contain" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Main image: 3/4 frame matches the photos; transparent background + light border; object-contain = never cropped */}
          <div
            className="relative min-w-0 flex-1 overflow-hidden rounded-none border border-line bg-transparent"
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
              touchX.current = null;
            }}
          >
            <SmartImage key={gallery[active]} src={gallery[active]} alt={`${product.name} — image ${active + 1}`} ratio="3 / 4" eager className="!bg-transparent" imgClassName="object-contain" />
            {gallery.length > 1 && (
              <>
                <button type="button" aria-label="Previous image" onClick={() => go(-1)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-none bg-page/85 text-ink shadow-md backdrop-blur transition hover:bg-page">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" aria-label="Next image" onClick={() => go(1)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-none bg-page/85 text-ink shadow-md backdrop-blur transition hover:bg-page">
                  <ChevronRight size={20} />
                </button>
                <span className="absolute bottom-3 right-3 rounded-none bg-black/55 px-3 py-1 text-xs text-white" aria-live="polite">{active + 1} / {gallery.length}</span>
              </>
            )}
          </div>
        </div>
        <div className="md:sticky md:top-28">
          <h1 className="text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted">{product.descriptor}{product.size ? ` · ${product.size}` : ''}</p>
          <p className="mt-6 text-2xl">{formatINR(product.price)}</p>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">{product.description}</p>

          {isSet && (
            <div className="mt-6">
              <h2 className="font-sans text-sm font-medium">Includes</h2>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {PRODUCTS.map((p) => (
                  <li key={p.id}><Link to={`/product/${p.slug}`} className="hover:text-ink">{p.name}</Link></li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-none border border-line" role="group" aria-label="Quantity">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center"><Minus size={14} /></button>
              <span aria-live="polite" className="w-8 text-center text-sm">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} className="flex h-11 w-11 items-center justify-center"><Plus size={14} /></button>
            </div>
            <Button type="button" arrow={false} onClick={handleAdd}>
              {added ? <><Check size={14} /> Added to cart</> : 'Add to cart'}
            </Button>
          </div>
          {added && <p role="status" className="mt-3 text-sm"><Link to="/cart" className="underline">View cart</Link></p>}

          <dl className="mt-10 max-w-md divide-y divide-line border-y border-line text-[15px]">
            {product.notes && (
              <div className="flex justify-between gap-6 py-4"><dt className="text-muted">Fragrance notes</dt><dd className="text-right">{product.notes}</dd></div>
            )}
            {product.size && (
              <div className="flex justify-between gap-6 py-4"><dt className="text-muted">Size</dt><dd>{product.size}</dd></div>
            )}
            <div className="flex justify-between gap-6 py-4"><dt className="text-muted">Type</dt><dd>{isSet ? 'Discovery set' : 'Eau de parfum'}</dd></div>
            {SHIPPING_NOTE && (
              <div className="flex justify-between gap-6 py-4"><dt className="text-muted">Delivery</dt><dd className="text-right">{SHIPPING_NOTE}</dd></div>
            )}
          </dl>
        </div>
      </div>

      <section aria-labelledby="related-title" className="mt-24">
        <h2 id="related-title" className="text-3xl">You may also like</h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      </section>
    </div>
  );
}
