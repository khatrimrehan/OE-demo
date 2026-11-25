import { Link } from 'react-router-dom';
import SmartImage from './ui/SmartImage';
import { formatINR } from '../lib/format';

export default function ProductCard({ product }) {
  const href = product.id === 'discovery-set' ? '/discovery-set' : `/product/${product.slug}`;
  return (
    <Link to={href} className="group block" aria-label={`${product.name}, ${formatINR(product.price)}`}>
      <div className="overflow-hidden rounded-none bg-gray-50">
        <SmartImage
          src={product.image}
          alt={product.name}
          ratio="3 / 4"
          className="!bg-transparent"
          imgClassName="object-cover"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-1 p-1">
        <div>
          <h3 className="font-serif text-2xl font-medium leading-tight">{product.name}</h3>
          <p className="text-[15px] text-muted">
            {product.descriptor}{product.size ? ` · ${product.size}` : ''}
          </p>
        </div>
        <span className="shrink-0 mt-1 font-medium justify-center items-center flex  rounded-none bg-surface px-4 py-2 text-[16px]">{formatINR(product.price)}</span>
      </div>
    </Link>
  );
}
