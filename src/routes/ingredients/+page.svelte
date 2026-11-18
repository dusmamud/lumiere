<script lang="ts">
	import { ArrowRight, FlowerLotus } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { products } from '#lib/data/products';

	// The materials that carry the catalogue, with the scents that use them.
	const materials = [
		{ name: 'Damask Rose', origin: 'Picked before sunrise', text: 'Thousands of blooms make a single kilo of rose absolute. It is what makes Rose Éternelle smell like a real rose, not a rose idea.', scents: ['rose-eternelle', 'pivoine-royale', 'fleur-de-minuit'] },
		{ name: 'Sandalwood', origin: 'Aged before distillation', text: 'Creamy, soft wood that gives Santal Doré its long, smooth dry-down rather than a sharp woody edge.', scents: ['santal-dore', 'velvet-ambre', 'bois-sacre'] },
		{ name: 'Oud', origin: 'Resinous heartwood', text: 'Smoky, deep and unapologetically regal — the centre of Oud Royal, softened by saffron and rose.', scents: ['oud-royal'] },
		{ name: 'Vanilla', origin: 'Madagascar vanilla bean', text: 'Dark and resinous, closer to rum and smoke than to cake. The gourmand for grown-ups.', scents: ['vanille-noir', 'santal-dore', 'velvet-ambre'] },
		{ name: 'Neroli & Orange Blossom', origin: 'Mediterranean groves', text: 'Sunlit and green-edged — the clean brightness at the heart of Néroli Blanc.', scents: ['neroli-blanc', 'citrus-noir'] },
		{ name: 'Vetiver', origin: 'Grassy roots', text: 'Smoky and grounding. It is what bright bergamot settles into as Citrus Noir dries down.', scents: ['citrus-noir', 'bois-sacre'] },
		{ name: 'White Musk', origin: 'Clean musk accord', text: 'The “clean skin” note — powdery, soft, and the reason Musc Blanc smells like you, only better.', scents: ['musc-blanc', 'lumiere-blanche', 'rose-eternelle'] },
		{ name: 'Jasmine', origin: 'Night-blooming flowers', text: 'Picked at night when the scent is at its most heady. The luminous heart of Lumière Blanche.', scents: ['lumiere-blanche', 'fleur-de-minuit'] }
	];

	function scentName(slug: string): string {
		return products.find((p) => p.slug === slug)?.name ?? slug;
	}
</script>

<svelte:head>
	<title>Ingredients — Lumière Parfums</title>
	<meta name="description" content="The raw materials behind Lumière Parfums — Damask rose, sandalwood, oud, vanilla, neroli, vetiver, white musk and jasmine." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Ingredients"
		title="The Ingredients That Matter"
		sub="A perfume is only as good as its raw materials. These are the few that carry our twelve scents — where they come from, and what they do on skin."
	/>

	<Reveal>
		<div class="mt-10 overflow-hidden rounded-[2rem] shadow-card">
			<img
				src="/images/journal-ingredients.webp"
				alt="Raw fragrance ingredients — rose petals, vanilla pods, woods and resins"
				width="1200"
				height="800"
				fetchpriority="high"
				class="aspect-[16/9] w-full object-cover"
			/>
		</div>
	</Reveal>

	<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
		{#each materials as m, i}
			<Reveal delay={Math.min(i, 5) * 50}>
				<article class="h-full rounded-[2rem] bg-white p-7 shadow-card">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold"><FlowerLotus size={24} weight="thin" /></span>
					<h2 class="mt-4 font-display text-2xl font-semibold">{m.name}</h2>
					<p class="mt-1 text-xs font-semibold tracking-[0.2em] text-gold uppercase">{m.origin}</p>
					<p class="mt-3 text-sm leading-relaxed text-ink-soft">{m.text}</p>
					<p class="mt-4 text-sm">
						<span class="font-semibold">Worn in: </span>
						{#each m.scents as slug, j}
							<a href="/product/{slug}/" class="font-medium text-gold underline-offset-2 hover:underline">{scentName(slug)}</a>{#if j < m.scents.length - 1}<span class="text-ink-soft"> · </span>{/if}
						{/each}
					</p>
				</article>
			</Reveal>
		{/each}
	</div>

	<Reveal>
		<p class="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-ink-soft">
			No amount of blending can rescue a flat rose or a thin sandalwood — which is why the house spends more
			time choosing ingredients than on almost anything else.
			<a href="/journal/the-ingredients-that-matter/" class="font-semibold text-gold underline underline-offset-2"> Read the full story in the Journal</a>
			<ArrowRight size={15} weight="bold" class="inline" />
		</p>
	</Reveal>
</section>
