<script lang="ts">
	import { ArrowRight, Clock, Package, Truck } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { FREE_SHIPPING_AT } from '#lib/data/products';

	const methods = [
		{ name: 'Standard', time: '3–5 business days', price: '$6.95 — free over $75', Icon: Package },
		{ name: 'Express', time: '1–2 business days', price: '$14.95', Icon: Truck },
		{ name: 'Processing', time: 'Orders ship within 2 business days', price: 'Monday to Friday', Icon: Clock }
	];
</script>

<svelte:head>
	<title>Shipping &amp; Delivery — Lumière Parfums</title>
	<meta name="description" content="Shipping at Lumière Parfums — free over $75, standard 3–5 days, express 1–2 days. Orders ship within 2 business days." />
</svelte:head>

<section class="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Help"
		title="Shipping & Delivery"
		sub="Orders ship within 2 business days, carefully packed in our signature box with a complimentary sample."
	/>

	<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
		{#each methods as m, i}
			<Reveal delay={i * 60}>
				<div class="h-full rounded-[2rem] bg-white p-6 text-center shadow-card">
					<span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold"><m.Icon size={24} weight="thin" /></span>
					<h2 class="mt-4 font-display text-xl font-semibold">{m.name}</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">{m.time}</p>
					<p class="mt-1 text-sm font-semibold">{m.price}</p>
				</div>
			</Reveal>
		{/each}
	</div>

	<Reveal>
		<div class="mt-8 space-y-5 rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
			<h2 class="font-display text-2xl font-semibold">The details</h2>
			<p class="text-sm leading-relaxed text-ink-soft">
				Shipping is free on all orders over ${FREE_SHIPPING_AT.toFixed(0)}. Below that, standard shipping is a
				flat $6.95 and express shipping is $14.95. The shipping cost is shown at checkout before you pay.
			</p>
			<p class="text-sm leading-relaxed text-ink-soft">
				Every parcel is packed in our signature gift box with protective filling, and includes a complimentary
				sample chosen by the house. You will receive a tracking link by email as soon as your order leaves the
				atelier — you can follow it on the <a href="/track/" class="font-semibold text-gold underline underline-offset-2">Track Order</a> page.
			</p>
			<p class="text-sm leading-relaxed text-ink-soft">
				We currently ship within the United States, Canada, the United Kingdom, France, Germany, Australia
				and India. Delivery times are estimates; customs in your country can occasionally add a day or two.
				Duties and taxes, where they apply, are the customer’s responsibility.
			</p>
			<p class="text-sm leading-relaxed text-ink-soft">
				If a parcel arrives damaged, photograph the box and the bottle and write to us within 14 days — we
				will replace it or refund it, your choice.
			</p>
		</div>
	</Reveal>

	<a href="/shop/" class="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
		Shop fragrances <ArrowRight size={16} weight="bold" />
	</a>
</section>
