<script lang="ts">
	import { ArrowRight, Drop, Flask, Flower, Gift, Sparkle, SprayBottle } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { collections } from '#lib/data/collections';
	import { getProductsByCategory, products } from '#lib/data/products';

	const icons: Record<string, typeof Flower> = {
		womens: Flower,
		mens: SprayBottle,
		unisex: Flask,
		'gift-sets': Gift,
		'oils-rollers': Drop,
		'discovery-sets': Sparkle
	};

	function countFor(slug: string): number {
		const c = collections.find((x) => x.slug === slug);
		if (c?.category) return getProductsByCategory(c.category).length;
		return products.length;
	}
</script>

<svelte:head>
	<title>Collections — Lumière Parfums</title>
	<meta name="description" content="Browse the Lumière Parfums collections — women's, men's and unisex fragrances, gift sets, perfume oils and discovery sets." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Collections"
		title="Explore Collections"
		sub="Six ways into the house — by who it is for, by how it is given, and by how it is tried."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each collections as c, i}
			{@const Icon = icons[c.slug] ?? Sparkle}
			<Reveal delay={Math.min(i, 5) * 60}>
				<a
					href="/collections/{c.slug}/"
					class="group flex h-full flex-col rounded-[2rem] bg-white p-7 shadow-card transition-shadow hover:shadow-lift"
				>
					<span class="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-ink transition-colors group-hover:bg-gold group-hover:text-white">
						<Icon size={26} weight="thin" />
					</span>
					<h2 class="mt-5 font-display text-2xl font-semibold group-hover:text-gold">{c.title}</h2>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{c.description}</p>
					<span class="mt-5 flex min-h-11 items-center gap-1.5 text-[13px] font-semibold tracking-[0.1em] text-ink uppercase">
						{countFor(c.slug)} fragrances <ArrowRight size={16} weight="bold" class="transition-transform group-hover:translate-x-1" />
					</span>
				</a>
			</Reveal>
		{/each}
	</div>
</section>
