/**
 * Lumière Parfums catalogue — local/static data for now.
 *
 * No ratings, no reviews, no testimonials anywhere: the house has no
 * customer reviews to show yet, and none are invented.
 */

export type Category = "women's" | "men's" | 'unisex';

export interface NotePyramid {
	top: string[];
	heart: string[];
	base: string[];
}

export interface Product {
	slug: string;
	name: string;
	/** Short note line shown on cards, e.g. "Rose · Peony · Musk". */
	notes: string;
	price: number;
	/** Bottle colour / finish, e.g. "pink bottle". */
	bottle: string;
	category: Category;
	collection: string;
	badge?: 'Best Seller' | 'New' | 'Limited';
	sizes: string[];
	description: string;
	pyramid: NotePyramid;
	/** Path under /images/ — the images agent fills static/images/. */
	image: string;
}

export const products: Product[] = [
	{
		slug: 'rose-eternelle',
		name: 'ROSE ÉTERNELLE',
		notes: 'Rose · Peony · Musk',
		price: 125,
		bottle: 'pink bottle',
		category: "women's",
		collection: 'Floral',
		badge: 'Best Seller',
		sizes: ['50ml', '100ml'],
		description:
			'A rose that never fades. Damask rose and fresh peony open the scent, settling into a soft white musk that lingers on skin from morning to midnight.',
		pyramid: {
			top: ['Damask Rose', 'Pink Pepper', 'Lychee'],
			heart: ['Peony', 'Rose Absolute', 'Geranium'],
			base: ['White Musk', 'Sandalwood', 'Amber']
		},
		image: '/images/product-rose-eternelle.webp'
	},
	{
		slug: 'santal-dore',
		name: 'SANTAL DORÉ',
		notes: 'Sandalwood · Amber · Vanilla',
		price: 135,
		bottle: 'amber',
		category: 'unisex',
		collection: 'Woody',
		badge: 'Best Seller',
		sizes: ['50ml', '100ml'],
		description:
			'Golden sandalwood warmed by amber and vanilla bean. Smooth, creamy and quietly opulent — the scent of late afternoon light.',
		pyramid: {
			top: ['Cardamom', 'Bergamot'],
			heart: ['Sandalwood', 'Iris', 'Cedar'],
			base: ['Amber', 'Vanilla Bean', 'Tonka']
		},
		image: '/images/product-santal-dore.webp'
	},
	{
		slug: 'citrus-noir',
		name: 'CITRUS NOIR',
		notes: 'Bergamot · Iris · Vetiver',
		price: 120,
		bottle: 'clear',
		category: "men's",
		collection: 'Fresh',
		badge: 'New',
		sizes: ['50ml', '100ml'],
		description:
			'Bright Calabrian bergamot cut with a dark, powdery iris and smoky vetiver. Crisp on first spray, mysterious as it dries down.',
		pyramid: {
			top: ['Bergamot', 'Grapefruit', 'Black Pepper'],
			heart: ['Iris', 'Lavender', 'Neroli'],
			base: ['Vetiver', 'Cedarwood', 'Musk']
		},
		image: '/images/product-citrus-noir.webp'
	},
	{
		slug: 'oud-royal',
		name: 'OUD ROYAL',
		notes: 'Oud · Patchouli · Leather',
		price: 155,
		bottle: 'black',
		category: "men's",
		collection: 'Oriental',
		badge: 'Best Seller',
		sizes: ['50ml', '100ml'],
		description:
			'Smoky oud and earthy patchouli over a supple leather base. Bold, resinous and unapologetically regal — made for evenings that run long.',
		pyramid: {
			top: ['Saffron', 'Raspberry', 'Cardamom'],
			heart: ['Oud', 'Patchouli', 'Rose'],
			base: ['Leather', 'Amber', 'Sandalwood']
		},
		image: '/images/product-oud-royal.webp'
	},
	{
		slug: 'lumiere-blanche',
		name: 'LUMIÈRE BLANCHE',
		notes: 'Jasmine · White Musk · Cedar',
		price: 125,
		bottle: 'pale gold',
		category: "women's",
		collection: 'Floral',
		badge: 'New',
		sizes: ['50ml', '100ml'],
		description:
			'The house signature in white. Night-blooming jasmine and clean white musk over pale cedar — luminous, airy, and endlessly wearable.',
		pyramid: {
			top: ['Jasmine', 'Pear Blossom', 'Aldehydes'],
			heart: ['Tuberose', 'Orange Blossom', 'Lily of the Valley'],
			base: ['White Musk', 'Cedar', 'Cashmere Wood']
		},
		image: '/images/product-lumiere-blanche.webp'
	},
	{
		slug: 'velvet-ambre',
		name: 'VELVET AMBRE',
		notes: 'Amber · Labdanum · Vanilla',
		price: 145,
		bottle: 'amber',
		category: 'unisex',
		collection: 'Oriental',
		sizes: ['50ml', '100ml'],
		description:
			'Warm amber wrapped in labdanum resin and Madagascar vanilla. A soft, enveloping glow — velvet in a bottle.',
		pyramid: {
			top: ['Pink Pepper', 'Coriander'],
			heart: ['Labdanum', 'Amber', 'Benzoin'],
			base: ['Vanilla', 'Sandalwood', 'Tonka']
		},
		image: '/images/product-velvet-ambre.webp'
	},
	{
		slug: 'neroli-blanc',
		name: 'NÉROLI BLANC',
		notes: 'Neroli · Orange Blossom · Petitgrain',
		price: 110,
		bottle: 'clear',
		category: 'unisex',
		collection: 'Fresh',
		badge: 'New',
		sizes: ['50ml', '100ml'],
		description:
			'Sunlit neroli and orange blossom with a green petitgrain edge. The Mediterranean in a bottle — clean, bright and effortlessly fresh.',
		pyramid: {
			top: ['Neroli', 'Petitgrain', 'Lemon'],
			heart: ['Orange Blossom', 'Jasmine', 'Rosemary'],
			base: ['White Musk', 'Neroli Absolute', 'Cedar']
		},
		image: '/images/product-neroli-blanc.webp'
	},
	{
		slug: 'vanille-noir',
		name: 'VANILLE NOIR',
		notes: 'Vanilla · Tonka · Rum',
		price: 130,
		bottle: 'black',
		category: 'unisex',
		collection: 'Gourmand',
		sizes: ['50ml', '100ml'],
		description:
			'Dark vanilla bean steeped in rum and tonka, with a whisper of smoke. Sweet without ever being sugary — the gourmand for grown-ups.',
		pyramid: {
			top: ['Rum', 'Plum', 'Cinnamon'],
			heart: ['Vanilla Orchid', 'Tonka Bean', 'Tobacco Leaf'],
			base: ['Vanilla Absolute', 'Sandalwood', 'Benzoin']
		},
		image: '/images/product-vanille-noir.webp'
	},
	{
		slug: 'fleur-de-minuit',
		name: 'FLEUR DE MINUIT',
		notes: 'Tuberose · Gardenia · Ylang-Ylang',
		price: 150,
		bottle: 'pale gold',
		category: "women's",
		collection: 'Floral',
		badge: 'Limited',
		sizes: ['50ml', '100ml'],
		description:
			'White flowers picked at midnight, when their scent is at its most heady. Tuberose and gardenia, softened by creamy ylang-ylang.',
		pyramid: {
			top: ['Tuberose', 'Green Leaves'],
			heart: ['Gardenia', 'Ylang-Ylang', 'Jasmine Sambac'],
			base: ['White Musk', 'Sandalwood', 'Amber']
		},
		image: '/images/product-fleur-de-minuit.webp'
	},
	{
		slug: 'bois-sacre',
		name: 'BOIS SACRÉ',
		notes: 'Cedar · Vetiver · Incense',
		price: 140,
		bottle: 'amber',
		category: "men's",
		collection: 'Woody',
		sizes: ['50ml', '100ml'],
		description:
			'Sacred woods and incense smoke. Dry cedar and vetiver over a resinous frankincense base — still, grounded and quietly powerful.',
		pyramid: {
			top: ['Frankincense', 'Nutmeg'],
			heart: ['Cedarwood', 'Vetiver', 'Papyrus'],
			base: ['Incense', 'Sandalwood', 'Myrrh']
		},
		image: '/images/product-bois-sacre.webp'
	},
	{
		slug: 'pivoine-royale',
		name: 'PIVOINE ROYALE',
		notes: 'Peony · Raspberry · Rose',
		price: 118,
		bottle: 'pink bottle',
		category: "women's",
		collection: 'Floral',
		sizes: ['50ml', '100ml'],
		description:
			'A royal peony in full bloom, brightened with raspberry and a blush of rose. Soft, romantic and unmistakably feminine.',
		pyramid: {
			top: ['Raspberry', 'Pink Peony', 'Litchi'],
			heart: ['Peony', 'Rose', 'Freesia'],
			base: ['Musk', 'Cashmere Wood', 'Amber']
		},
		image: '/images/product-pivoine-royale.webp'
	},
	{
		slug: 'musc-blanc',
		name: 'MUSC BLANC',
		notes: 'White Musk · Iris · Aldehydes',
		price: 95,
		bottle: 'clear',
		category: 'unisex',
		collection: 'Fresh',
		sizes: ['50ml', '100ml'],
		description:
			'Clean skin, bottled. White musk and powdery iris over sparkling aldehydes — the everyday scent that smells like you, only better.',
		pyramid: {
			top: ['Aldehydes', 'Bergamot'],
			heart: ['White Musk', 'Iris', 'Lily of the Valley'],
			base: ['Musk', 'Ambrette', 'Cedar']
		},
		image: '/images/product-musc-blanc.webp'
	}
];

export const featuredProducts: Product[] = products.filter((p) =>
	['rose-eternelle', 'santal-dore', 'citrus-noir', 'oud-royal', 'lumiere-blanche'].includes(p.slug)
);

export function getProduct(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
	return products.filter((p) => p.category === category);
}

export function getCollections(): string[] {
	return [...new Set(products.map((p) => p.collection))];
}

/**
 * Price for a bottle size. The listed price is the 100ml price;
 * the 50ml bottle is $25 less. Every cart/checkout surface must use
 * this helper so the price shown and the price charged always agree.
 */
export function priceForSize(product: Product, size: string): number {
	return size === '50ml' ? Math.max(0, product.price - 25) : product.price;
}

export const FREE_SHIPPING_AT = 75;
