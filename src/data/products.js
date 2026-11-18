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
    image: '/assets/Bottles/Mareva/Bergamot Seaweed Musk Perfume Flat Lay.png',
    images: [
      '/assets/Bottles/Mareva/Minimalist Mareva Perfume Poster.png',
      '/assets/Bottles/Mareva/Hands Holding Odour Mareva Perfume.png',
      '/assets/Bottles/Mareva/Bergamot Seaweed Musk Perfume Flat Lay.png',
    ],
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
    heroimage: '/assets/Bottles/Mareva/Bergamot Seaweed Musk Perfume Flat Lay.png',
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
    image: '/assets/Bottles/Dreamscape/Citron, Black Tea & Ambrox Perfume Flat Lay.png',
    images: [
      '/assets/Bottles/Dreamscape/Minimalist Dreamscape Perfume Poster.png',
      '/assets/Bottles/Dreamscape/Dreamscape Perfume Bottle in Hand.png',
      '/assets/Bottles/Dreamscape/Citron, Black Tea & Ambrox Perfume Flat Lay.png',
    ],
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
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
    image: '/assets/Bottles/Citrus Garden/Odour Elixirs Citrus Garden Flat Lay.png',
    images: [
      '/assets/Bottles/Citrus Garden/Citrus Garden Perfume Editorial (1).png',
      '/assets/Bottles/Citrus Garden/Odour Elixirs Citrus Garden Bottle.png',
      '/assets/Bottles/Citrus Garden/Odour Elixirs Citrus Garden Flat Lay.png',
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
    image: '/assets/Bottles/Roasted Affair/Roasted Affair Perfume Flat Lay.png',
    images: [
      '/assets/Bottles/Roasted Affair/Roasted Affair Perfume Minimalist Poster.png',
      '/assets/Bottles/Roasted Affair/Roasted Affair Perfume Bottle.png',
      '/assets/Bottles/Roasted Affair/Roasted Affair Perfume Flat Lay.png',
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
    image: '/assets/Bottles/Vanilla Ember/Vanilla Ember Perfume Still Life.png',
    images: [
      '/assets/Bottles/Vanilla Ember/Minimalist Vanilla Ember Perfume Poster.png',
      '/assets/Bottles/Vanilla Ember/Vanilla Ember Perfume in Hand.png',
      '/assets/Bottles/Vanilla Ember/Vanilla Ember Perfume Still Life.png',
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
  image: '/assets/products/discovery-set.png',
  images: [
    '/assets/Bottles/Mareva/file_00000000c2f082108871b19aee51a12c.png',
    '/assets/Bottles/Dreamscape/file_0000000057708207807817d02682a89b.png',
    '/assets/Bottles/Citrus Garden/file_0000000090f882078c71f952d7aab764.png',
    '/assets/Bottles/Roasted Affair/file_00000000c7d882078f6580fd1ae6e476.png',
    '/assets/Bottles/Vanilla Ember/file_00000000978082079e915bfcbb7faf94.png',
  ],
  description:
    'Experience the complete Odour Elixirs collection. Five fragrances, one set — find your signature.',
};

export const CATALOG = [...PRODUCTS, DISCOVERY_SET];

export const getProductById = (id) => CATALOG.find((p) => p.id === id);
export const getProductBySlug = (slug) => CATALOG.find((p) => p.slug === slug);
