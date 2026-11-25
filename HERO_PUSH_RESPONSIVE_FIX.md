# Hero bottle push + responsive update

The existing five-bottle image is unchanged. This update coordinates the title, subtitle,
and Explore Collection button with the bottles. The text remains at its original position
until the approaching bottle caps reach it. Then the same scroll movement pushes the
whole text group upward. Scrolling backward reverses the effect.

## Changes
- `src/components/Hero.jsx`: replaced early, independent copy fade/motion with
  contact-driven movement linked to the image. Uses ResizeObserver to remeasure when
  responsive text wraps or the browser resizes. The bottles never fade out entirely.
- `src/index.css`: responsive initial layout using natural text height (rather than
  separate absolute coordinates); mobile, tablet, and short landscape adjustments.
- Existing smooth cursor follower and gentle bottom-edge bottle blur are preserved.

## Running locally

```sh
npm install
npm run dev
```

For deployment, run `npm run build`, then deploy the `dist` folder.

## Tweaks
- `PUSH_GAP` in Hero.jsx is the space between the button and rising caps.
- `.hero-scroll-image-position` controls the size and initial gap in CSS.
- `travel` in Hero.jsx controls how far bottles move during scrolling.
