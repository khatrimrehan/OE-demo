import Button from './ui/Button';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';
import ProductCard from './ProductCard';
import { PRODUCTS, DISCOVERY_SET } from '../data/products';

export default function ProductCollection({ standalone = false }) {
  const items = standalone ? [...PRODUCTS] : PRODUCTS;
  return (
    <section aria-labelledby="collection-title" className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
      <SectionHeader
        pill="Collection"
        id="collection-title"
        as={standalone ? 'h1' : 'h2'}
        title="Find Your Signature."
        action={!standalone && <Button to="/shop" variant="outline">View All</Button>}
      />
      <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 3) * 0.08}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
