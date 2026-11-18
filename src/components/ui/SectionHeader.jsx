import Pill from './Pill';
import Reveal from './Reveal';

/**
 * Pill on its own row, then heading + optional action button on ONE line
 * (phones included). The heading shrinks on small screens so the button
 * label never wraps onto a second line.
 */
export default function SectionHeader({ pill, id, as: Heading = 'h2', title, action }) {
  return (
    <div>
      <Reveal>
        <Pill>{pill}</Pill>
      </Reveal>
      <div className="mt-5 flex flex-nowrap items-end justify-between gap-3 sm:gap-6">
        <Reveal className="min-w-0 flex-1">
          <Heading id={id} className="text-[24px] leading-[1.1] min-[400px]:text-[28px] sm:text-4xl md:text-5xl">{title}</Heading>
        </Reveal>
        {action && <Reveal delay={0.1} className="shrink-0 whitespace-nowrap">{action}</Reveal>}
      </div>
    </div>
  );
}
