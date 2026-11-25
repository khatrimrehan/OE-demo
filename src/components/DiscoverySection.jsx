import { Link } from 'react-router-dom';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import SmartImage from './ui/SmartImage';
import { DISCOVERY_SET } from '../data/products';
import { formatINR } from '../lib/format';


// export default function DiscoverySection() {
//   return (
//     <section aria-labelledby="discovery-title" className="mx-auto max-w-page px-5 py-20 text-center md:px-8 md:py-32">
//       <Reveal>
//         <span className="inline-flex text-left rounded-none bg-surface px-3 py-1 text-[15px] uppercase tracking-wide">Discovery Set</span>
//       </Reveal>
//       <Reveal delay={0.08} className="mx-auto mt-8 max-w-[480px]">
//         <Link to="/discovery-set" aria-label="View the Discovery Set" className="group block overflow-hidden rounded-none">
//           <SmartImage src={DISCOVERY_SET.image} alt="Odour Elixirs Discovery Set" ratio="16 / 10" imgClassName="object-contain transition-transform duration-700 group-hover:scale-105" />
//         </Link>
//       </Reveal>
//       <Reveal as="h2" id="discovery-title" delay={0.1} className="mt-8 text-3xl md:text-[40px]">Five Scents. One Discovery.</Reveal>
//       <Reveal as="p" delay={0.15} className="mx-auto mt-3 max-w-md text-sm text-muted">
//         Experience the complete Odour Elixirs collection. Find your signature.
//       </Reveal>
//       <Reveal as="p" delay={0.18} className="mt-3 text-sm">{formatINR(DISCOVERY_SET.price)}</Reveal>
//       <Reveal delay={0.22} className="mt-5"><Button to="/discovery-set">Explore the Set</Button></Reveal>
//     </section>
//   );
// }
export default function DiscoverySection({ compact = false }) {
  return (
    <section
      aria-labelledby="discovery-title"
      className={`mx-auto max-w-page px-5 md:px-8 ${
        compact ? "pt-8 pb-0 md:pt-10 pb-0" : "py-20 md:py-32"
      }`}
    >
      <Reveal>
        <span className="inline-flex rounded-none bg-surface px-3 py-1 text-[15px] uppercase tracking-wide">
          Discovery Set
        </span>
      </Reveal>

      <div className="mt-8 grid items-stretch gap-8 md:grid-cols-2 md:gap-14">
        <Reveal delay={0.08}>
          <Link
            to="/discovery-set"
            aria-label="View the Discovery Set"
            className="group block overflow-hidden rounded-none"
          >
            <SmartImage
              src={DISCOVERY_SET.image}
              alt="Odour Elixirs Discovery Set"
              ratio="16 / 10"
              imgClassName="object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        </Reveal>

        <div className="flex flex-col gap-6 md:justify-around md:gap-10">
          <div>
            <Reveal
              as="h2"
              id="discovery-title"
              delay={0.1}
              className="text-balance text-[28px] leading-tight sm:text-3xl md:text-[40px]"
            >
              Five Scents. One Discovery.
            </Reveal>

            <Reveal
              as="p"
              delay={0.15}
              className="mt-3 max-w-md text-balance text-sm text-muted"
            >
              Experience the complete Odour Elixirs collection.
              Find your signature.
            </Reveal>

            <Reveal
              as="p"
              delay={0.18}
              className="mt-5 text-2xl font-semibold"
            >
              {formatINR(DISCOVERY_SET.price)}
            </Reveal>
          </div>

          <Reveal delay={0.22} className="self-start">
            <Button to="/discovery-set">Explore the Set</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
