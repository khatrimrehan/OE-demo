// Pure data module — also imported by server/index.js, so keep it free of JSX and import.meta.env.
// Edit prices here; every page, the cart and the order API read from this file.

export const PRICES = {
  perfume: 349, // INR per 30 ml fragrance — configurable
  discoverySet: 299, // INR — configurable
};

// Delivery charge in INR added at checkout. 0 = none. Set to your real value.
export const SHIPPING_FEE = 0;
// Optional note shown in cart/checkout, e.g. "Free delivery across India". Leave '' to hide.
export const SHIPPING_NOTE = '';

export const MAX_QTY = 10;

// GALLERY: each product has an `images` list. The product page shows them in THIS order
// (first = big image on load, also used as the cover on cards). Reorder / add / remove lines freely.
export const PRODUCTS = [
  {
    id: 'mareva',
    slug: 'mareva',
    name: 'Mareva',
    notes: 'Bergamot · Seaweed · Musk', // shown on the product page (copied from the bottle label)
    descriptor: 'Bergamot · Seaweed · Musk', // taken from the bottle label in your recording
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/Bottles/Mareva/Bergamot Seaweed Musk Perfume Flat Lay.webp',
    images: [
      '/assets/Bottles/Mareva/Minimalist Mareva Perfume Poster.webp',
      '/assets/Bottles/Mareva/Hands Holding Odour Mareva Perfume.webp',
      '/assets/Bottles/Mareva/Bergamot Seaweed Musk Perfume Flat Lay.webp',
    ],
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
    heroimage: '/assets/Bottles/Hero-image/Luxury Elixirs Perfume Collection.webp',
  },
  {
    id: 'citrus-garden',
    slug: 'citrus-garden',
    name: 'Citrus Garden',
    notes: 'Blackcurrant · Apricot · Fig', // shown on the product page (copied from the bottle label)
    descriptor: 'Signature fragrance',
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/Bottles/Citrus Garden/Odour Elixirs Citrus Garden Flat Lay.webp',
    images: [
      '/assets/Bottles/Citrus Garden/Citrus Garden Perfume Editorial (1).webp',
      '/assets/Bottles/Citrus Garden/Odour Elixirs Citrus Garden Bottle.webp',
      '/assets/Bottles/Citrus Garden/Odour Elixirs Citrus Garden Flat Lay.webp',
    ],
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
  {
    id: 'roasted-affair',
    slug: 'roasted-affair',
    name: 'Roasted Affair',
    notes: 'Cinnamon · Praline · Vanilla', // shown on the product page (copied from the bottle label)
    descriptor: 'Signature fragrance',
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/Bottles/Roasted Affair/Roasted Affair Perfume Flat Lay.webp',
    images: [
      '/assets/Bottles/Roasted Affair/Roasted Affair Perfume Minimalist Poster.webp',
      '/assets/Bottles/Roasted Affair/Roasted Affair Perfume Bottle.webp',
      '/assets/Bottles/Roasted Affair/Roasted Affair Perfume Flat Lay.webp',
    ],
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
  {
    id: 'dreamscape',
    slug: 'dreamscape',
    name: 'Dreamscape',
    notes: 'Citron · Black Tea · Ambrox', // shown on the product page (copied from the bottle label)
    descriptor: 'Signature fragrance',
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/Bottles/Dreamscape/Citron, Black Tea & Ambrox Perfume Flat Lay.webp',
    images: [
      '/assets/Bottles/Dreamscape/Minimalist Dreamscape Perfume Poster.webp',
      '/assets/Bottles/Dreamscape/Dreamscape Perfume Bottle in Hand.webp',
      '/assets/Bottles/Dreamscape/Citron, Black Tea & Ambrox Perfume Flat Lay.webp',
    ],
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
  
  
  {
    id: 'vanilla-ember',
    slug: 'vanilla-ember',
    name: 'Vanilla Ember',
    notes: 'Cinnamon · Orange Blossom · Bourbon Vanilla', // shown on the product page (copied from the bottle label)
    descriptor: 'Signature fragrance',
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/Bottles/Vanilla Ember/Vanilla Ember Perfume Still Life.webp',
    images: [
      '/assets/Bottles/Vanilla Ember/Minimalist Vanilla Ember Perfume Poster.webp',
      '/assets/Bottles/Vanilla Ember/Vanilla Ember Perfume in Hand.webp',
      '/assets/Bottles/Vanilla Ember/Vanilla Ember Perfume Still Life.webp',
    ],
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
];

export const DISCOVERY_SET = {
  id: 'discovery-set',
  slug: 'discovery-set',
  name: 'Discovery Set',
  descriptor: 'All five fragrances',
  category: 'Set',
  size: null,
  price: PRICES.discoverySet,
  image: '/assets/Bottles/Discovery-Image/Discovery-Five.webp',
  images: [
    '/assets/Bottles/Discovery-Image/Mareva.webp',
    '/assets/Bottles/Discovery-Image/Citrus-Garden.webp',
    '/assets/Bottles/Discovery-Image/Roasted_Affairs.webp',
    '/assets/Bottles/Discovery-Image/Dreamscape.webp',
    '/assets/Bottles/Discovery-Image/Vanilla-Ember.webp',
  ],
  description:
    'Experience the complete Odour Elixirs collection. Five fragrances, one set — find your signature.',
};

export const CATALOG = [...PRODUCTS, DISCOVERY_SET];

export const getProductById = (id) => CATALOG.find((p) => p.id === id);
export const getProductBySlug = (slug) => CATALOG.find((p) => p.slug === slug);
