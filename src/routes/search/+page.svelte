<script lang="ts">
	import { page } from '$app/state';
	import { MagnifyingGlass, X } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { searchProducts } from '#lib/api';

	let q = $state('');
	// url.searchParams is not available during prerender — read after mount.
	$effect(() => {
		q = page.url.searchParams.get('q') ?? '';
	});
	const results = $derived(searchProducts(q));
</script>

<svelte:head>
	<title>{q ? `Search: ${q} — Lumière Parfums` : 'Search — Lumière Parfums'}</title>
	<meta name="description" content="Search Lumière Parfums fragrances by name, note or collection." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Search"
		title={q ? `Results for “${q}”` : 'Search Fragrances'}
		sub="Search by name, note or collection — rose, oud, vanilla, woody…"
	/>

	<form method="get" action="/search/" role="search" class="mt-8 flex max-w-2xl gap-2">
		<div class="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 focus-within:border-gold">
			<MagnifyingGlass size={19} class="shrink-0 text-ink-soft" />
			<label for="search-q" class="sr-only">Search fragrances</label>
			<input
				id="search-q"
				name="q"
				type="search"
				value={q}
				placeholder="Search by name or note…"
				autocomplete="off"
				class="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft/60"
			/>
			{#if q}
				<a href="/search/" aria-label="Clear search" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream">
					<X size={17} />
				</a>
			{/if}
		</div>
		<button type="submit" class="h-12 shrink-0 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-gold">
			Search
		</button>
	</form>

	{#if q}
		<p class="mt-8 text-sm text-ink-soft" role="status">
			{results.length} {results.length === 1 ? 'result' : 'results'} for “{q}”
		</p>
		{#if results.length}
			<div class="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
				{#each results as product, i (product.slug)}
					<Reveal delay={Math.min(i, 7) * 40}>
						<ProductCard {product} />
					</Reveal>
				{/each}
			</div>
		{:else}
			<div class="mt-6 rounded-[2rem] bg-white p-10 text-center shadow-card">
				<p class="font-display text-2xl font-semibold">Nothing found for “{q}”</p>
				<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
					Try a single note — rose, oud, vanilla, citrus, musk — or browse the full collection.
				</p>
				<a href="/shop/" class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
					Browse All Fragrances
				</a>
			</div>
		{/if}
	{:else}
		<div class="mt-8">
			<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">Try searching for</p>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each ['Rose', 'Oud', 'Vanilla', 'Sandalwood', 'Citrus', 'Musk'] as term}
					<a href="/search/?q={encodeURIComponent(term.toLowerCase())}" class="flex h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-medium transition-colors hover:border-gold hover:text-gold">
						{term}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</section>
