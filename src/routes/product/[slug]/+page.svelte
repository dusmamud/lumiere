<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import { ArrowLeft, ArrowRight, Check, Heart, Minus, Plus, ShoppingBag, Truck } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { cart, ui, wishlist } from '#lib/store.svelte';
	import { toast } from '#lib/toast.svelte';
	import { getProduct, priceForSize, products } from '#lib/data/products';

	const slug = page.params.slug ?? '';
	const product = getProduct(slug);
	if (!product) throw error(404, 'Fragrance not found');

	let size = $state('100ml');
	let qty = $state(1);
	let zoom = $state(false);

	const price = $derived(priceForSize(product, size));
	const related = $derived(
		products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
	);

	function addToBag() {
		if (!product) return;
		cart.add(product.slug, size, qty);
		toast.success(`${product.name} (${size}) added to your bag`);
		ui.cartOpen = true;
	}
</script>

<svelte:head>
	<title>{product.name} — Lumière Parfums</title>
	<meta name="description" content={product.description} />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
	<nav aria-label="Breadcrumb" class="text-sm text-ink-soft">
		<a href="/" class="hover:text-gold">Home</a> <span aria-hidden="true">/</span>
		<a href="/shop/" class="hover:text-gold">Shop</a> <span aria-hidden="true">/</span>
		<span class="text-ink">{product.name}</span>
	</nav>

	<div class="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
		<!-- Gallery: one photo, shown at two crops -->
		<div>
			<button
				type="button"
				onclick={() => (zoom = !zoom)}
				class="block w-full overflow-hidden rounded-[2rem] bg-beige"
				aria-label={zoom ? 'Close enlarged image' : 'Enlarge image'}
			>
				<img
					src={product.image}
					alt="{product.name} — {product.bottle}"
					width="1000"
					height="1000"
					fetchpriority="high"
					class="aspect-square w-full object-cover transition-transform duration-500 {zoom ? 'scale-150' : 'hover:scale-[1.04]'}"
				/>
			</button>
			<div class="mt-4 grid grid-cols-3 gap-3">
				<img src={product.image} alt="{product.name} — bottle" loading="lazy" width="300" height="300" class="aspect-square w-full rounded-2xl object-cover" />
				<img src={product.image} alt="{product.name} — detail crop" loading="lazy" width="300" height="300" class="aspect-square w-full rounded-2xl object-cover object-[20%_80%]" />
				<img src={product.image} alt="{product.name} — label crop" loading="lazy" width="300" height="300" class="aspect-square w-full rounded-2xl object-cover object-[80%_20%]" />
			</div>
			<p class="mt-3 text-center text-xs text-ink-soft">Tap the main image to zoom in</p>
		</div>

		<!-- Buy box -->
		<div>
			{#if product.badge}
				<span class="inline-block rounded-full bg-ink px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">{product.badge}</span>
			{/if}
			<h1 class="mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl">{product.name}</h1>
			<p class="mt-3 text-base text-ink-soft">{product.notes} · {product.category} · {product.collection}</p>
			<p class="mt-4 text-3xl font-semibold">${price.toFixed(2)}</p>
			<p class="mt-1 text-sm text-ink-soft">
				{#if size === '50ml'}
					50ml bottle — the 100ml bottle is ${product.price.toFixed(2)}.
				{:else}
					100ml bottle — also available as 50ml for ${(product.price - 25).toFixed(2)}.
				{/if}
			</p>

			<p class="mt-7 leading-relaxed text-ink-soft">{product.description}</p>

			<!-- Size selector -->
			<fieldset class="mt-8">
				<legend class="text-xs font-semibold tracking-[0.2em] text-ink uppercase">Bottle Size</legend>
				<div class="mt-3 flex gap-3">
					{#each product.sizes as s}
						<button
							type="button"
							onclick={() => (size = s)}
							aria-pressed={size === s}
							class="flex h-12 min-w-24 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors {size === s
								? 'border-ink bg-ink text-white'
								: 'border-line bg-white hover:border-gold hover:text-gold'}"
						>
							{s} · ${priceForSize(product, s).toFixed(2)}
						</button>
					{/each}
				</div>
			</fieldset>

			<!-- Qty + Add -->
			<div class="mt-6 flex flex-wrap items-center gap-3">
				<div class="flex items-center rounded-full border border-line bg-white">
					<button
						type="button"
						onclick={() => (qty = Math.max(1, qty - 1))}
						disabled={qty <= 1}
						class="flex h-12 w-12 items-center justify-center rounded-full transition-colors disabled:opacity-35"
						aria-label="Decrease quantity"
					>
						<Minus size={16} weight="bold" />
					</button>
					<span class="w-8 text-center text-base font-semibold" aria-live="polite">{qty}</span>
					<button
						type="button"
						onclick={() => (qty = Math.min(9, qty + 1))}
						disabled={qty >= 9}
						class="flex h-12 w-12 items-center justify-center rounded-full transition-colors disabled:opacity-35"
						aria-label="Increase quantity"
					>
						<Plus size={16} weight="bold" />
					</button>
				</div>
				<button
					type="button"
					onclick={addToBag}
					class="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold"
				>
					<ShoppingBag size={18} /> Add to Bag — ${(price * qty).toFixed(2)}
				</button>
				<button
					type="button"
					onclick={() => {
						wishlist.toggle(product.slug);
						toast.info(
							wishlist.has(product.slug)
								? `${product.name} saved to your wishlist`
								: `${product.name} removed from your wishlist`
						);
					}}
					aria-pressed={wishlist.has(product.slug)}
					aria-label={wishlist.has(product.slug) ? 'Remove from wishlist' : 'Add to wishlist'}
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors {wishlist.has(product.slug)
						? 'border-gold bg-gold/10 text-gold'
						: 'border-line bg-white hover:border-gold hover:text-gold'}"
				>
					<Heart size={20} weight={wishlist.has(product.slug) ? 'fill' : 'regular'} />
				</button>
			</div>

			<p class="mt-5 flex items-center gap-2 text-sm text-ink-soft">
				<Truck size={18} class="shrink-0 text-gold" /> Free shipping on orders over $75 · Complimentary sample with every order
			</p>

			<!-- Notes pyramid -->
			<div class="mt-8 rounded-[2rem] bg-white p-6 shadow-card sm:p-7">
				<h2 class="text-xs font-semibold tracking-[0.25em] text-gold uppercase">The Notes</h2>
				<dl class="mt-4 space-y-4">
					<div class="flex gap-4">
						<dt class="w-16 shrink-0 text-sm font-semibold">Top</dt>
						<dd class="text-sm leading-relaxed text-ink-soft">{product.pyramid.top.join(' · ')}</dd>
					</div>
					<div class="flex gap-4 border-t border-line pt-4">
						<dt class="w-16 shrink-0 text-sm font-semibold">Heart</dt>
						<dd class="text-sm leading-relaxed text-ink-soft">{product.pyramid.heart.join(' · ')}</dd>
					</div>
					<div class="flex gap-4 border-t border-line pt-4">
						<dt class="w-16 shrink-0 text-sm font-semibold">Base</dt>
						<dd class="text-sm leading-relaxed text-ink-soft">{product.pyramid.base.join(' · ')}</dd>
					</div>
				</dl>
			</div>

			<!-- Accordions -->
			<div class="mt-6 divide-y divide-line rounded-[2rem] bg-white px-6 shadow-card sm:px-7">
				<details class="group py-5">
					<summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
						Details
						<Plus size={18} weight="bold" class="shrink-0 transition-transform group-open:rotate-45" />
					</summary>
					<p class="pt-3 text-sm leading-relaxed text-ink-soft">
						Eau de parfum, {size} glass bottle with a black lacquered cap. Composed in small batches;
						macerated for several weeks before bottling. Apply to pulse points — wrists, neck, behind
						the ears — and let the scent develop on skin. Store away from direct sunlight.
					</p>
				</details>
				<details class="group py-5">
					<summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
						Shipping &amp; Returns
						<Plus size={18} weight="bold" class="shrink-0 transition-transform group-open:rotate-45" />
					</summary>
					<p class="pt-3 text-sm leading-relaxed text-ink-soft">
						Orders ship within 2 business days. Free shipping on orders over $75; otherwise a flat
						$6.95. Unopened bottles can be returned within 30 days for a full refund — see
						<a href="/returns/" class="font-semibold text-gold underline underline-offset-2">Returns</a>
						for the full policy.
					</p>
				</details>
			</div>
		</div>
	</div>

	<!-- Related -->
	{#if related.length}
		<div class="mt-16">
			<Reveal>
				<div class="flex items-end justify-between gap-4">
					<h2 class="font-display text-3xl font-semibold">You May Also Like</h2>
					<a
						href="/shop/{product.category === "women's" ? 'womens' : product.category === "men's" ? 'mens' : 'unisex'}/"
						class="flex min-h-11 shrink-0 items-center gap-1.5 text-[13px] font-semibold tracking-[0.1em] text-ink uppercase transition-colors hover:text-gold"
					>
						More {product.category} <ArrowRight size={16} weight="bold" />
					</a>
				</div>
			</Reveal>
			<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
				{#each related as p, i}
					<Reveal delay={i * 60}>
						<ProductCard product={p} />
					</Reveal>
				{/each}
			</div>
		</div>
	{/if}

	<a href="/shop/" class="mt-12 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold hover:text-ink">
		<ArrowLeft size={16} weight="bold" /> Back to all fragrances
	</a>
	<p class="mt-2 flex items-center gap-2 text-xs text-ink-soft">
		<Check size={14} class="text-gold" /> In the demo storefront, prices are shown for the selected bottle size and the cart charges exactly that price.
	</p>
</section>
