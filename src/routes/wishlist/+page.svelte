<script lang="ts">
	import { ArrowRight, Heart } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { wishlist } from '#lib/store.svelte';
	import { products } from '#lib/data/products';

	const saved = $derived(products.filter((p) => wishlist.has(p.slug)));
</script>

<svelte:head>
	<title>My Wishlist — Lumière Parfums</title>
	<meta name="description" content="The fragrances you saved at Lumière Parfums." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Saved"
		title="My Wishlist"
		sub="The scents you are thinking about — saved on this device."
	/>

	{#if saved.length}
		<p class="mt-8 text-sm text-ink-soft" role="status">
			{saved.length} {saved.length === 1 ? 'fragrance' : 'fragrances'} saved
		</p>
		<div class="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
			{#each saved as product, i (product.slug)}
				<Reveal delay={Math.min(i, 7) * 40}>
					<ProductCard {product} />
				</Reveal>
			{/each}
		</div>
	{:else}
		<div class="mt-10 flex flex-col items-center rounded-[2rem] bg-white px-8 py-16 text-center shadow-card">
			<span class="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-gold">
				<Heart size={34} />
			</span>
			<h2 class="mt-5 font-display text-2xl font-semibold">Nothing saved yet</h2>
			<p class="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
				Tap the heart on any fragrance to keep it here for later.
			</p>
			<a href="/shop/" class="mt-6 flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
				Browse Fragrances <ArrowRight size={17} weight="bold" />
			</a>
		</div>
	{/if}
</section>
