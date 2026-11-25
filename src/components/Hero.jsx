// import { useLayoutEffect, useRef, useState } from 'react';
// import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
// import Button from './ui/Button';
// import Reveal from './ui/Reveal';
// import { PRODUCTS } from '../data/products';

// // Source image contains transparent space above the perfume caps.
// const BOTTLE_TOP_FRACTION = 1 / 1672;
// const PUSH_GAP = 0;

// /** Copy moves only once the rising bottle caps meet the button's lower edge. */
// export default function Hero() {
//   const sceneRef = useRef(null);
//   const stageRef = useRef(null);
//   const copyRef = useRef(null);
//   const imagePositionRef = useRef(null);
//   const reduceMotion = useReducedMotion();
//   const [geometry, setGeometry] = useState({ copyBottom: 0, bottleTop: 0, travel: 0 });
//   const heroImage = PRODUCTS[0].heroimage;

//   const { scrollYProgress } = useScroll({
//     target: sceneRef,
//     offset: ['start start', 'end end'],
//   });

//   useLayoutEffect(() => {
//     const stage = stageRef.current;
//     const copy = copyRef.current;
//     const image = imagePositionRef.current;
//     if (!stage || !copy || !image) return undefined;

//     let disposed = false;
//     const measure = () => {
//       if (disposed) return;
//       const copyBottom = copy.offsetTop + copy.offsetHeight;
//       const bottleTop = image.offsetTop + image.clientWidth * BOTTLE_TOP_FRACTION;
//       const stageHeight = stage.clientHeight;
//       const travel = Math.max(0, Math.min(stageHeight * 0.53, bottleTop + stageHeight * 0.11));
//       setGeometry((old) => (
//         Math.abs(old.copyBottom - copyBottom) < 0.5 &&
//         Math.abs(old.bottleTop - bottleTop) < 0.5 &&
//         Math.abs(old.travel - travel) < 0.5
//           ? old : { copyBottom, bottleTop, travel }
//       ));
//     };

//     measure();
//     const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
//     if (observer) {
//       observer.observe(stage);
//       observer.observe(copy);
//       observer.observe(image);
//     }
//     window.addEventListener('resize', measure, { passive: true });
//     if (document.fonts) document.fonts.ready.then(measure).catch(() => {});
//     return () => {
//       disposed = true;
//       observer?.disconnect();
//       window.removeEventListener('resize', measure);
//     };
//   }, []);

//   // Bottle and copy share a single scroll progress; they cannot drift apart.
//   // Text neither fades out early nor jumps before physical bottle contact.
//   const bottleY = useTransform(scrollYProgress, [0, 0.08, 0.79, 1],
//     [0, 0, -geometry.travel * 0.88, -geometry.travel]);
//   const copyY = useTransform(bottleY, (shift) =>
//     Math.min(0, geometry.bottleTop + shift - geometry.copyBottom - PUSH_GAP));
//   const blurredOpacity = useTransform(scrollYProgress, [0, 0.58, 0.84, 1], [0, 0, 0.22, 0.38]);

//   return (
//     <section ref={sceneRef} aria-labelledby="hero-title" className="hero-scroll-scene">
//       <div ref={stageRef} className="hero-scroll-stage">
//         <motion.div ref={copyRef} className="hero-scroll-copy" style={reduceMotion ? undefined : { y: copyY }}>
//           <Reveal as="h1" id="hero-title" className="text-[30px] leading-[1.12] sm:text-[40px] md:text-[48px]">
//             The Art of Leaving a <span className="text-muted">Trace.</span>
//           </Reveal>
//           <Reveal as="p" delay={0.12} className="mx-auto mt-3 max-w-[320px] text-[15px] leading-snug text-muted sm:mt-4 sm:text-[17px]">
//             Discover fragrances designed to become part of your signature.
//           </Reveal>
//           <Reveal delay={0.22} className="mt-4 sm:mt-6">
//             <Button to="/shop">Explore Collection</Button>
//           </Reveal>
//         </motion.div>

//         <div ref={imagePositionRef} className="hero-scroll-image-position">
//           <motion.div className="hero-scroll-image-stack" style={reduceMotion ? undefined : { y: bottleY }}>
//             <img
//               src={heroImage}
//               alt="Odour Elixirs collection: Roasted Affair, Dreamscape, Mareva, Citrus Garden and Vanilla Ember"
//               width="1672" height="941" fetchPriority="high" loading="eager" decoding="async" draggable="false"
//               className="hero-scroll-image hero-scroll-static-image"
//             />
//             {!reduceMotion && <motion.img
//               aria-hidden="true" alt="" src={heroImage} width="1672" height="941" decoding="async" draggable="false"
//               className="hero-scroll-image hero-scroll-blurred-image" style={{ opacity: blurredOpacity }}
//             />}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Button from './ui/Button';
import { PRODUCTS } from '../data/products';

export default function Hero() {
  const heroImage = PRODUCTS[0].heroimage;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden"
    >
      <div className="mx-auto flex min-h-[85svh] w-full max-w-[1600px] flex-col items-center justify-center px-4 pt-24 pb-4 text-center sm:px-6 md:pt-28">

        {/* Hero Text */}
        <div className="relative z-10">
          <h1
            id="hero-title"
            className="text-[30px] leading-[1.12] sm:text-[40px] md:text-[48px]"
          >
            The Art of Leaving a{' '}
            <span className="text-muted">Trace.</span>
          </h1>

          <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-snug text-muted sm:mt-4 sm:text-[17px]">
            Discover fragrances designed to become part of your signature.
          </p>

          <div className="mt-4 sm:mt-6">
            <Button to="/shop">
              Explore Collection
            </Button>
          </div>
        </div>

        {/* Static Hero Image */}
        <div className="mt-8 flex w-full items-center justify-center sm:mt-10">
          <img
            src={heroImage}
            alt="Odour Elixirs Perfume Collection"
            width="1672"
            height="941"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            draggable="false"
            className="block h-auto w-full max-w-[990px] object-contain select-none"
          />
        </div>

      </div>
    </section>
  );
}
