import type { Category } from './products';

/**
 * The six collections shown on /collections/ and /collections/[slug]/.
 * The first three filter the catalogue by category; the last three are
 * formats of the same catalogue, presented with their own banners.
 */
export interface CollectionMeta {
	slug: string;
	title: string;
	description: string;
	/** Catalogue category this collection filters by, if any. */
	category?: Category;
}

export const collections: CollectionMeta[] = [
	{
		slug: 'womens',
		title: "Women's Perfumes",
		description: 'Floral, luminous and romantic — roses, peonies and white flowers.',
		category: "women's"
	},
	{
		slug: 'mens',
		title: "Men's Perfumes",
		description: 'Woody, fresh and dark — cedar, vetiver, oud and bright citrus.',
		category: "men's"
	},
	{
		slug: 'unisex',
		title: 'Unisex Fragrances',
		description: 'Scents that belong to whoever wears them — warm amber, clean musk, bright neroli.',
		category: 'unisex'
	},
	{
		slug: 'gift-sets',
		title: 'Gift Sets & Collections',
		description: 'Beautifully wrapped, thoughtfully chosen — every fragrance, ready to give.',
	},
	{
		slug: 'oils-rollers',
		title: 'Perfume Oils & Rollers',
		description: 'The same scents as concentrated oils and 10ml rollers — for skin, pulse points and travel.',
	},
	{
		slug: 'discovery-sets',
		title: 'Discovery Sets',
		description: 'Five small vials, one signature scent waiting to be found. Try them all at home.',
	}
];

export function getCollection(slug: string): CollectionMeta | undefined {
	return collections.find((c) => c.slug === slug);
}
