<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import { ArrowRight, Info } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { getCollection } from '#lib/data/collections';
	import { getProductsByCategory, products } from '#lib/data/products';

	const slug = page.params.slug ?? '';
	const collection = getCollection(slug);
	if (!collection) throw error(404, 'Collection not found');

	const list = collection.category ? getProductsByCategory(collection.category) : products;
	const isDiscovery = slug === 'discovery-sets';
	const isGift = slug === 'gift-sets';
	const isOils = slug === 'oils-rollers';
</script>

<svelte:head>
	<title>{collection.title} — Lumière Parfums</title>
	<meta name="description" content={collection.description} />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<nav aria-label="Breadcrumb" class="text-sm text-ink-soft">
		<a href="/" class="hover:text-gold">Home</a> <span aria-hidden="true">/</span>
		<a href="/collections/" class="hover:text-gold">Collections</a> <span aria-hidden="true">/</span>
		<span class="text-ink">{collection.title}</span>
	</nav>
	<div class="mt-6">
		<PageHero eyebrow="Collection" title={collection.title} sub={collection.description} />
	</div>

	{#if isDiscovery}
		<Reveal>
			<div class="mt-10 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-9 lg:grid-cols-2">
				<img
					src="/images/discovery-set.webp"
					alt="Lumière discovery set — five small vials in a black gift box"
					loading="lazy"
					width="800"
					height="600"
					class="aspect-[4/3] w-full rounded-3xl object-cover"
				/>
				<div>
					<h2 class="font-display text-3xl font-semibold">Five vials. One signature scent.</h2>
					<p class="mt-3 leading-relaxed text-white/75">
						Each discovery set holds five 2ml vials to wear at home, one per day, on skin. When one vial
						runs out before the others, you have your answer.
					</p>
					<a
						href="/discovery-sets/"
						class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-gold hover:text-white"
					>
						See the Discovery Sets <ArrowRight size={16} weight="bold" />
					</a>
				</div>
			</div>
		</Reveal>
	{/if}

	{#if isGift}
		<Reveal>
			<div class="mt-10 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[2rem] bg-beige p-7 sm:p-9 lg:grid-cols-2">
				<img
					src="/images/gift-box.webp"
					alt="Lumière gift box with a black ribbon beside a bottle of Éclat Noir"
					loading="lazy"
					width="800"
					height="600"
					class="aspect-[4/3] w-full rounded-3xl object-cover"
				/>
				<div>
					<h2 class="font-display text-3xl font-semibold">Beautifully wrapped, thoughtfully chosen.</h2>
					<p class="mt-3 leading-relaxed text-ink-soft">
						Every fragrance can be sent as a gift — wrapped in our signature box with a black ribbon and
						a hand-written message card, plus a complimentary sample with every order.
					</p>
					<a
						href="/gift-cards/"
						class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold"
					>
						Gift Cards <ArrowRight size={16} weight="bold" />
					</a>
				</div>
			</div>
		</Reveal>
	{/if}

	{#if isOils}
		<Reveal>
			<div class="mt-10 flex gap-4 rounded-[2rem] bg-white p-6 shadow-card sm:p-7">
				<Info size={24} class="mt-0.5 shrink-0 text-gold" />
				<div>
					<h2 class="font-display text-xl font-semibold">Perfume oils &amp; rollers — coming soon</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">
						The same scents as concentrated perfume oils and 10ml rollers are on their way. Until they
						arrive, the full bottles below are the same compositions — the oils will simply wear closer
						to the skin and last longer on pulse points.
					</p>
				</div>
			</div>
		</Reveal>
	{/if}

	<p class="mt-10 text-sm text-ink-soft" role="status">
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
