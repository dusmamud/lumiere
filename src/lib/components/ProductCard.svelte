<script lang="ts">
	import { Check, Heart, Plus } from 'phosphor-svelte';
	import { cart, wishlist } from '#lib/store.svelte';
	import { toast } from '#lib/toast.svelte';
	import type { Product } from '#lib/data/products';

	let { product }: { product: Product } = $props();

	let added = $state(false);

	function quickAdd() {
		// Add the 100ml bottle — the size whose price the card displays.
		const size = product.sizes.includes('100ml') ? '100ml' : (product.sizes[0] ?? '50ml');
		cart.add(product.slug, size, 1);
		added = true;
		toast.success(`${product.name} added to your bag`);
		setTimeout(() => (added = false), 1400);
	}
</script>

<article
	class="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-beige transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
>
	<a href="/product/{product.slug}" class="relative block overflow-hidden bg-cream" aria-label={product.name}>
		<img
			src={product.image}
			alt="{product.name} — {product.bottle}"
			loading="lazy"
			width="800"
			height="800"
			class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
		/>
		{#if product.badge}
			<span
				class="absolute top-3 left-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase"
			>
				{product.badge}
			</span>
		{/if}
	</a>

	<button
		type="button"
		onclick={() => wishlist.toggle(product.slug)}
		aria-label={wishlist.has(product.slug) ? 'Remove from wishlist' : 'Add to wishlist'}
		aria-pressed={wishlist.has(product.slug)}
		class="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110"
	>
		<Heart
			size={20}
			weight={wishlist.has(product.slug) ? 'fill' : 'regular'}
			class={wishlist.has(product.slug) ? 'text-gold' : 'text-ink'}
		/>
	</button>

	<div class="flex flex-1 flex-col p-4 sm:p-5">
		<a href="/product/{product.slug}" class="font-display text-lg leading-snug font-semibold hover:text-gold">
			{product.name}
		</a>
		<p class="mt-1 text-sm text-ink-soft">{product.notes}</p>
		<div class="mt-2 flex items-baseline gap-2">
			<span class="text-lg font-semibold">${product.price.toFixed(2)}</span>
			<span class="text-xs tracking-wide text-ink-soft uppercase">{product.category}</span>
		</div>
		<div class="mt-3 flex gap-2">
			<button
				type="button"
				onclick={quickAdd}
				class="flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white {added
					? 'bg-emerald-700'
					: 'bg-ink hover:bg-gold'}"
				aria-label="Add {product.name} to cart"
			>
				{#if added}
					<Check size={16} weight="bold" /> Added
				{:else}
					<Plus size={16} weight="bold" /> Add to Bag
				{/if}
			</button>
		</div>
	</div>
</article>
