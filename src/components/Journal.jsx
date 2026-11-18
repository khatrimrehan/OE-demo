import { Link } from 'react-router-dom';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import SmartImage from './ui/SmartImage';
import { ARTICLES } from '../data/journal';
import { SITE } from '../data/site';

export default function Journal({ standalone = false }) {
  return (
    <section aria-labelledby="journal-title" className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
      <SectionHeader
        pill="Journal"
        id="journal-title"
        as={standalone ? 'h1' : 'h2'}
        title="Beyond the Bottle."
        action={<Button href={SITE.instagramUrl} variant="outline">Follow Us</Button>}
      />
      <ul className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a, i) => (
          <Reveal as="li" key={a.slug} delay={(i % 3) * 0.08}>
            <Link to={`/journal/${a.slug}`} className="group block overflow-hidden rounded-none bg-surface">
              <div className="overflow-hidden">
                <SmartImage src={a.image} alt={a.title} ratio="4 / 3" imgClassName="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <span className="inline-flex rounded-none bg-white px-3 py-1 text-[14px]">{a.category}</span>
                <h3 className="mt-3 font-serif text-xl leading-snug">{a.title}</h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
