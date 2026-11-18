<script lang="ts">
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { products } from '#lib/data/products';

	const bestSellers = products.filter((p) => p.badge === 'Best Seller');
</script>

<svelte:head>
	<title>Best Sellers — Lumière Parfums</title>
	<meta name="description" content="The most-loved Lumière Parfums fragrances — Rose Éternelle, Santal Doré and Oud Royal." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Most Loved"
		title="Best Sellers"
		sub="The three scents our customers come back for — the rose that never fades, the golden sandalwood, and the smoky oud."
	/>
	<div class="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
		{#each bestSellers as product, i (product.slug)}
			<Reveal delay={i * 60}>
				<ProductCard {product} />
			</Reveal>
		{/each}
	</div>
	<Reveal>
		<p class="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-ink-soft">
			Not sure where to start? The <a href="/discovery-sets/" class="font-semibold text-gold underline underline-offset-2 hover:text-ink">discovery set</a>
			lets you try five scents at home before choosing a full bottle.
		</p>
	</Reveal>
</section>
