/**
 * Journal articles — real prose about the craft and the ingredients.
 * No invented reviews or testimonials anywhere.
 */

export interface JournalArticle {
	slug: string;
	title: string;
	excerpt: string;
	image: string;
	imageAlt: string;
	date: string;
	readMinutes: number;
	/** Body paragraphs, in order. */
	body: string[];
}

export const journalArticles: JournalArticle[] = [
	{
		slug: 'inside-the-atelier',
		title: 'Inside the Atelier: How a Lumière Scent Is Born',
		excerpt:
			'From the first sketch of an idea to the final maceration, a fragrance takes months of quiet, patient work. A look inside the room where it happens.',
		image: '/images/journal-atelier.webp',
		imageAlt: 'Inside the Lumière atelier — bottles, beakers and raw materials on the perfumer’s bench',
		date: 'November 2026',
		readMinutes: 5,
		body: [
			'Every Lumière fragrance begins the same way: not with a brief, but with a feeling. The perfumer writes a single sentence on a card — “the smell of rain on warm stone”, “a garden at midnight” — and pins it above the bench. Everything that follows has to answer that sentence.',
			'The first stage is the sketch. Small vials of raw materials are blended in rough proportions, sometimes a dozen versions in a single afternoon. Most are discarded by evening. The ones that survive are left to rest, because a scent on day one is never the scent on day seven — the materials need time to marry.',
			'Then comes maceration. The chosen blend is diluted in alcohol and left to mature for several weeks in a cool, dark room. This is the slowest part of the process, and the one that cannot be rushed: it is what turns a sharp collection of notes into a single, seamless scent.',
			'Only after maceration does the perfumer return to the bench for the final judgement, wearing the scent on skin rather than on paper. A fragrance that smells beautiful on a blotter can fall apart on skin; the final version has to live there, from the first bright minutes to the quiet hours at the end of the day.',
			'What leaves the atelier is never the first draft. It is usually the fortieth — the one that still answers the sentence on the card.'
		]
	},
	{
		slug: 'the-ingredients-that-matter',
		title: 'The Ingredients That Matter',
		excerpt:
			'Damask rose, sandalwood, vetiver, vanilla — a few materials carry a fragrance. Why we choose them, where they come from, and what they do on skin.',
		image: '/images/journal-ingredients.webp',
		imageAlt: 'Raw fragrance ingredients — rose petals, vanilla pods, woods and resins',
		date: 'October 2026',
		readMinutes: 4,
		body: [
			'A perfume is only as good as its raw materials. No amount of blending can rescue a flat rose or a thin sandalwood, so the house spends more time choosing ingredients than it does on almost anything else.',
			'Damask rose arrives from fields that are picked before sunrise, while the petals are still cool and their scent is at its fullest. It takes thousands of blooms to make a single kilo of rose absolute — which is why a rose fragrance that smells like a real rose costs what it does.',
			'Sandalwood is the quiet backbone of the woody scents. The creamy, soft wood we use is aged before it is distilled, and it is what gives Santal Doré its long, smooth dry-down rather than a sharp, woody edge.',
			'Vetiver and vetiver’s cousins — the smoky, grassy roots — do the opposite job: they anchor a scent and keep it from floating away. In Citrus Noir, vetiver is what the bright bergamot settles into as the day goes on.',
			'Vanilla is the most misunderstood ingredient in perfumery. The vanilla in Vanille Noir is dark and resinous, closer to rum and smoke than to cake — a reminder that a single material can be warm without ever being sweet.',
			'None of this is decoration. When you wear a Lumière fragrance, what you are mostly smelling is the quality of these few materials, and the time it took to let them speak.'
		]
	},
	{
		slug: 'finding-your-signature-scent',
		title: 'Finding Your Signature Scent',
		excerpt:
			'The right fragrance is the one you forget you are wearing — until someone asks what it is. A slow, practical way to find it.',
		image: '/images/discovery-set.webp',
		imageAlt: 'The Lumière discovery set — small vials for trying each scent at home',
		date: 'October 2026',
		readMinutes: 4,
		body: [
			'The most common mistake in choosing a fragrance is deciding too fast. A scent changes completely between the first spray and the third hour, and the part you live with is the dry-down — the part you almost never test in a shop.',
			'Start with a discovery set. Wear one scent per day, on skin, not on paper, and live a normal day in it. Notice it at noon, not at nine in the morning. The right one is usually the one you stop noticing — it has become part of you, rather than something you are wearing.',
			'Pay attention to the compliments, too. A signature scent is rarely the one you love most in the bottle; it is the one other people remember on you.',
			'When one vial runs out before the others, you have your answer. That is the scent to buy in a full bottle — and the reason the discovery set exists at all.'
		]
	}
];

export function getArticle(slug: string): JournalArticle | undefined {
	return journalArticles.find((a) => a.slug === slug);
}
