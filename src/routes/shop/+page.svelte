<script lang="ts">
	import { page } from '$app/state';
	import { MagnifyingGlass, SlidersHorizontal, X } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { products, type Category } from '#lib/data/products';

	type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

	let q = $state('');
	let category = $state<'all' | Category>('all');
	let priceBand = $state('all');
	let sort = $state<SortKey>('featured');

	// url.searchParams is not available during prerender — read after mount.
	$effect(() => {
		const sp = page.url.searchParams;
		q = sp.get('q') ?? '';
		const c = sp.get('category');
		category = c === "women's" || c === "men's" || c === 'unisex' ? c : 'all';
		priceBand = sp.get('price') ?? 'all';
		const s = sp.get('sort');
		sort = s === 'price-asc' || s === 'price-desc' || s === 'name' ? s : 'featured';
	});

	const filtered = $derived.by(() => {
		const needle = q.trim().toLowerCase();
		let list = products.filter((p) => {
			if (category !== 'all' && p.category !== category) return false;
			if (priceBand === 'under-100' && p.price >= 100) return false;
			if (priceBand === '100-129' && (p.price < 100 || p.price > 129)) return false;
			if (priceBand === '130-plus' && p.price < 130) return false;
			if (
				needle &&
				!p.name.toLowerCase().includes(needle) &&
				!p.notes.toLowerCase().includes(needle) &&
				!p.collection.toLowerCase().includes(needle) &&
				!p.category.toLowerCase().includes(needle)
			)
				return false;
			return true;
		});
		if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
		if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
		if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
		return list;
	});

	const categories: { value: 'all' | Category; label: string }[] = [
		{ value: 'all', label: 'All' },
		{ value: "women's", label: "Women's" },
		{ value: "men's", label: "Men's" },
		{ value: 'unisex', label: 'Unisex' }
	];

	function clearFilters() {
		q = '';
		category = 'all';
		priceBand = 'all';
		sort = 'featured';
	}
</script>

<svelte:head>
	<title>Shop All Fragrances — Lumière Parfums</title>
	<meta name="description" content="Shop all twelve Lumière Parfums fragrances — women's, men's and unisex. Filter by category, notes and price." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Shop"
		title="All Fragrances"
		sub="Twelve scents, composed in small batches. Filter by who it is for, what it smells of, and what it costs."
	/>

	<!-- Search + sort -->
	<div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
		<form method="get" action="/shop/" role="search" class="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 focus-within:border-gold">
			<MagnifyingGlass size={19} class="shrink-0 text-ink-soft" />
			<label for="shop-search" class="sr-only">Search by name or note</label>
			<input
				id="shop-search"
				name="q"
				type="search"
				bind:value={q}
				placeholder="Search by name or note — rose, oud, vanilla…"
				autocomplete="off"
				class="h-12 min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft/60"
			/>
			{#if q}
				<button type="button" onclick={() => (q = '')} class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-cream" aria-label="Clear search">
					<X size={17} />
				</button>
			{/if}
		</form>
		<div class="flex items-center gap-2">
			<label for="shop-sort" class="sr-only">Sort fragrances</label>
			<select
				id="shop-sort"
				bind:value={sort}
				class="h-12 min-w-0 flex-1 rounded-full border border-line bg-white px-4 text-sm font-medium outline-none focus:border-gold sm:flex-none"
			>
				<option value="featured">Sort: Featured</option>
				<option value="price-asc">Price: Low to High</option>
				<option value="price-desc">Price: High to Low</option>
				<option value="name">Name: A to Z</option>
			</select>
		</div>
	</div>

	<!-- Filters -->
	<div class="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
		<span class="flex h-11 items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
			<SlidersHorizontal size={16} /> Filter
		</span>
		{#each categories as c}
			<button
				type="button"
				onclick={() => (category = c.value)}
				aria-pressed={category === c.value}
				class="flex h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors {category === c.value
					? 'border-ink bg-ink text-white'
					: 'border-line bg-white hover:border-gold hover:text-gold'}"
			>
				{c.label}
			</button>
		{/each}
		<label for="shop-price" class="sr-only">Filter by price</label>
		<select
			id="shop-price"
			bind:value={priceBand}
			class="h-11 rounded-full border border-line bg-white px-4 text-sm font-medium outline-none focus:border-gold"
		>
			<option value="all">Any price</option>
			<option value="under-100">Under $100</option>
			<option value="100-129">$100 – $129</option>
			<option value="130-plus">$130 and over</option>
		</select>
		{#if q || category !== 'all' || priceBand !== 'all' || sort !== 'featured'}
			<button
				type="button"
				onclick={clearFilters}
				class="flex h-11 items-center gap-1 rounded-full px-4 text-sm font-semibold text-gold transition-colors hover:bg-white"
			>
				<X size={15} weight="bold" /> Clear all
			</button>
		{/if}
	</div>

	<p class="mt-8 text-sm text-ink-soft" role="status">
		{filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'}
		{#if q}matching “{q}”{/if}
	</p>

	{#if filtered.length}
		<div class="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
			{#each filtered as product, i (product.slug)}
				<Reveal delay={Math.min(i, 7) * 40}>
					<ProductCard {product} />
				</Reveal>
			{/each}
		</div>
	{:else}
		<div class="mt-6 rounded-[2rem] bg-white p-10 text-center shadow-card">
			<p class="font-display text-2xl font-semibold">No fragrances match those filters</p>
			<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
				Try a different note or price range, or clear the filters to see the full collection.
			</p>
			<button
				type="button"
				onclick={clearFilters}
				class="mt-6 h-12 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold"
			>
				Clear all filters
			</button>
		</div>
	{/if}
</section>
