# Lumière Parfums

Luxury fragrance storefront — 47 prerendered pages built on the locked SvelteKit stack.

## Stack

- Svelte 5.57.3 + SvelteKit 3.2.0 + Vite 8.3.8 + TypeScript
- Tailwind CSS 4.3.5 + adapter-static (prerendered, output in `build/`)
- Phosphor icons only, Playfair Display + Jost

## Pages

Home, Shop (filters / sort / search), Best Sellers, 6 Collections, Discovery Sets,
12 product details, Cart, 3-step demo Checkout (order numbers `LM-*`), Search,
Sign-in / Account, Wishlist, Track, About, Journal + 3 articles, FAQ / Shipping /
Returns / Privacy / Terms, Gift Cards, Ingredients, Sustainability, Contact,
sitemap.xml + robots.txt.

## Run

```sh
npm install
npm run build   # writes static site to build/
npm run preview # serve the build locally
```

Checkout is demo-only (no real payment, no backend yet). The API seam is
`src/lib/api.ts`, ready for the later Go REST API.
