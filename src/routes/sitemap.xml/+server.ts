import { collections } from '#lib/data/collections';
import { journalArticles } from '#lib/data/journal';
import { products } from '#lib/data/products';

export const prerender = true;

const BASE = 'https://lumiere.pages.dev';

const staticRoutes = [
	'',
	'/shop',
	'/shop/womens',
	'/shop/mens',
	'/shop/unisex',
	'/best-sellers',
	'/collections',
	'/discovery-sets',
	'/cart',
	'/checkout',
	'/search',
	'/signin',
	'/account',
	'/about',
	'/journal',
	'/faq',
	'/shipping',
	'/returns',
	'/track',
	'/privacy',
	'/terms',
	'/wishlist',
	'/gift-cards',
	'/ingredients',
	'/sustainability',
	'/contact'
];

export function GET() {
	const urls = [
		...staticRoutes,
		...collections.map((c) => `/collections/${c.slug}`),
		...products.map((p) => `/product/${p.slug}`),
		...journalArticles.map((a) => `/journal/${a.slug}`)
	];
	const unique = [...new Set(urls)];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique
		.map((u) => `  <url><loc>${BASE}${u === '' ? '/' : u + '/'}</loc></url>`)
		.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
