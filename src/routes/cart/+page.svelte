<script lang="ts">
	import { ArrowRight, Minus, Plus, ShoppingBag, Trash, Truck } from 'phosphor-svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { cart } from '#lib/store.svelte';
	import { FREE_SHIPPING_AT, getProduct, priceForSize } from '#lib/data/products';

	let progress = $derived(Math.min(100, (cart.subtotal / FREE_SHIPPING_AT) * 100));
</script>

<svelte:head>
	<title>Your Bag — Lumière Parfums</title>
	<meta name="description" content="Review your Lumière Parfums bag — quantities, subtotal and free-shipping progress." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero eyebrow="Your Bag" title="Shopping Bag" sub="Review your fragrances before checkout." />

	{#if cart.lines.length}
		<div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<div class="rounded-[2rem] bg-white p-5 shadow-card sm:p-6">
					<p class="flex items-center gap-2 text-sm font-medium">
						<Truck size={18} class="text-gold" />
						{#if cart.shippingFree}
							<span class="text-emerald-700">You have unlocked FREE shipping!</span>
						{:else}
							Add <strong>${(FREE_SHIPPING_AT - cart.subtotal).toFixed(2)}</strong> more for free shipping
						{/if}
					</p>
					<div class="mt-3 h-1.5 overflow-hidden rounded-full bg-beige" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Progress towards free shipping">
						<div class="h-full rounded-full bg-gold transition-all duration-500" style="width: {progress}%"></div>
					</div>
				</div>

				<ul class="mt-6 divide-y divide-line rounded-[2rem] bg-white px-5 shadow-card sm:px-6">
					{#each cart.lines as line (line.slug + line.size)}
						{@const p = getProduct(line.slug)}
						{#if p}
							<li class="flex gap-4 py-5">
								<a href="/product/{p.slug}/" class="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream sm:h-28 sm:w-28">
									<img src={p.image} alt={p.name} class="h-full w-full object-cover" width="224" height="224" />
								</a>
								<div class="flex min-w-0 flex-1 flex-col">
									<div class="flex items-start justify-between gap-2">
										<div>
											<a href="/product/{p.slug}/" class="font-display text-lg leading-snug font-semibold hover:text-gold">{p.name}</a>
											<p class="mt-0.5 text-sm text-ink-soft">{p.notes} · {line.size}</p>
											<p class="mt-0.5 text-sm font-semibold">${priceForSize(p, line.size).toFixed(2)} each</p>
										</div>
										<button
											type="button"
											onclick={() => cart.remove(line.slug, line.size)}
											class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-red-600"
											aria-label="Remove {p.name} from bag"
										>
											<Trash size={18} />
										</button>
									</div>
									<div class="mt-auto flex items-center justify-between pt-3">
										<div class="flex items-center rounded-full border border-line">
											<button type="button" onclick={() => cart.setQty(line.slug, line.size, line.qty - 1)} disabled={line.qty <= 1} class="flex h-11 w-11 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-35" aria-label="Decrease quantity">
												<Minus size={15} weight="bold" />
											</button>
											<span class="w-7 text-center text-sm font-semibold">{line.qty}</span>
											<button type="button" onclick={() => cart.setQty(line.slug, line.size, line.qty + 1)} disabled={line.qty >= 9} class="flex h-11 w-11 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-35" aria-label="Increase quantity">
												<Plus size={15} weight="bold" />
											</button>
										</div>
										<span class="text-base font-bold">${(priceForSize(p, line.size) * line.qty).toFixed(2)}</span>
									</div>
								</div>
							</li>
						{/if}
					{/each}
				</ul>
			</div>

			<aside class="h-fit rounded-[2rem] bg-white p-6 shadow-card lg:sticky lg:top-32">
				<h2 class="font-display text-2xl font-semibold">Order Summary</h2>
				<dl class="mt-5 space-y-3 text-sm">
					<div class="flex justify-between"><dt class="text-ink-soft">Subtotal</dt><dd class="font-semibold">${cart.subtotal.toFixed(2)}</dd></div>
					<div class="flex justify-between"><dt class="text-ink-soft">Shipping</dt><dd class="font-semibold">{cart.shippingFree ? 'Free' : 'Calculated at checkout'}</dd></div>
					<div class="flex justify-between border-t border-line pt-3 text-base"><dt class="font-semibold">Total</dt><dd class="font-bold">${cart.subtotal.toFixed(2)}</dd></div>
				</dl>
				<a
					href="/checkout/"
					class="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold"
				>
					Checkout <ArrowRight size={17} weight="bold" />
				</a>
				<a href="/shop/" class="mt-3 flex h-11 w-full items-center justify-center rounded-full text-sm font-medium text-ink-soft transition-colors hover:bg-cream">
					Continue shopping
				</a>
				<p class="mt-4 text-center text-xs leading-relaxed text-ink-soft">
					Complimentary sample included with every order. 30-day returns on unopened bottles.
				</p>
			</aside>
		</div>
	{:else}
		<div class="mt-10 flex flex-col items-center rounded-[2rem] bg-white px-8 py-16 text-center shadow-card">
			<span class="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-gold">
				<ShoppingBag size={34} />
			</span>
			<h2 class="mt-5 font-display text-2xl font-semibold">Your bag is empty</h2>
			<p class="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">Find the scent that feels like you.</p>
			<a
				href="/shop/"
				class="mt-6 flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold"
			>
				Shop fragrances <ArrowRight size={17} weight="bold" />
			</a>
		</div>
	{/if}
</section>
