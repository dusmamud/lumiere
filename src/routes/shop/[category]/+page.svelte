<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { getProductsByCategory, type Category } from '#lib/data/products';

	const slugToCategory: Record<string, Category> = {
		womens: "women's",
		mens: "men's",
		unisex: 'unisex'
	};

	const meta: Record<string, { title: string; sub: string }> = {
		womens: {
			title: "Women's Perfumes",
			sub: 'Floral, luminous and romantic — roses, peonies and white flowers, worn from morning to midnight.'
		},
		mens: {
			title: "Men's Perfumes",
			sub: 'Woody, fresh and dark — cedar, vetiver, oud and citrus, built to last the whole day.'
		},
		unisex: {
			title: 'Unisex Fragrances',
			sub: 'Scents that belong to whoever wears them — warm amber, clean musk and bright neroli.'
		}
	};

	const slug = page.params.category ?? '';
	const category = slugToCategory[slug];
	if (!category) throw error(404, 'Category not found');
	const info = meta[slug];
	const list = getProductsByCategory(category);
</script>

<svelte:head>
	<title>{info.title} — Lumière Parfums</title>
	<meta name="description" content={info.sub} />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<nav aria-label="Breadcrumb" class="text-sm text-ink-soft">
		<a href="/" class="hover:text-gold">Home</a> <span aria-hidden="true">/</span>
		<a href="/shop/" class="hover:text-gold">Shop</a> <span aria-hidden="true">/</span>
		<span class="text-ink">{info.title}</span>
	</nav>
	<div class="mt-6">
		<PageHero eyebrow="Shop" title={info.title} sub={info.sub} />
	</div>
	<p class="mt-8 text-sm text-ink-soft" role="status">
		{list.length} {list.length === 1 ? 'fragrance' : 'fragrances'}
	</p>
	<div class="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
		{#each list as product, i (product.slug)}
			<Reveal delay={Math.min(i, 7) * 40}>
				<ProductCard {product} />
			</Reveal>
		{/each}
	</div>
</section>
