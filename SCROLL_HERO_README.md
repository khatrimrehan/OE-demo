# Scroll hero effect — Odour Elixirs

This project has been updated directly. Your **existing hero image** at
`public/assets/Bottles/Hero-image/Luxury Elixirs Perfume Collection.webp`
is unchanged.

## What's new
- Scroll-controlled bottle rise and short sticky hold, reversing naturally on upward scroll.
- A progressive blurred lower edge and transparent gradient fade into the page background.
- A tiny cursor-following dot with ease/trailing; hidden on mobile/touch and for reduced-motion users.
- No extra animation library: Framer Motion was already installed.
- Desktop/mobile sizing and an accessible static layout for reduced-motion settings.

## Files changed
- `src/components/Hero.jsx` — replaces the previous simple parallax with the scroll scene.
- `src/components/CursorFollower.jsx` — new animated dot.
- `src/App.jsx` — mounts the dot globally.
- `src/index.css` — hero/cursor styles, and `overflow-x: clip` for reliable sticky positioning.

## Run
```bash
npm install
npm run dev
```
To produce the production build:
```bash
npm run build
```

## Fine-tuning
- Animation progress keyframes: `src/components/Hero.jsx` (values between 0 and 1).
- Total scroll distance: `.hero-scroll-scene { height: 225svh; }` in `src/index.css`.
- Bottle size/position: `.hero-scroll-image-position` in `src/index.css`.
- Blur intensity: `.hero-scroll-blurred-image { filter: blur(12px); }`.
- Dot size: `.cursor-follower { width: 7px; height: 7px; }`.

No images, product descriptions, navigation, or shop behavior were replaced.

## Follow-up fixes (Nov 19)
- Raised the initial bottle placement (from +46svh to +5svh) and shifted the image anchor upward.
- Shortened the sticky section so it reaches the next section sooner.
- Removed the end-of-scroll image opacity fade and the background-colored overlay. Bottles now stay visible throughout the sticky hero, then leave naturally with the page.
- Kept a much gentler, scroll-linked blurred duplicate on the image's bottom edge only, while the original image remains fully visible underneath.
- Moved the follower dot 8px right and 12px above the pointer, and increased easing so it stays closer.
