<script lang="ts">
	import { ArrowRight, Globe, Leaf, Package, Recycle } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	const pledges = [
		{ title: 'Small batches, less waste', text: 'We bottle in small runs and only when a scent is ready. Nothing is made to sit in a warehouse, and nothing is made to be thrown away.', Icon: Leaf },
		{ title: 'Refillable by design', text: 'Our bottles are built to be kept, not replaced. A refill programme is on the way — the bottle you buy today is the bottle you will refill tomorrow.', Icon: Recycle },
		{ title: 'Honest sourcing', text: 'We buy rose, vanilla and sandalwood from growers we know by name, and we pay for the grade that smells right — not the cheapest grade available.', Icon: Globe },
		{ title: 'Packaging that lasts', text: 'The signature gift box is made to be reused, not recycled on arrival. Protective filling is paper, never plastic foam.', Icon: Package }
	];
</script>

<svelte:head>
	<title>Sustainability — Lumière Parfums</title>
	<meta name="description" content="How Lumière Parfums thinks about sustainability — small batches, honest sourcing, refillable bottles and reusable packaging." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Sustainability"
		title="Made Slowly, Made to Last"
		sub="A fragrance house cannot claim to be sustainable and release a scent every season. Here is what we actually do — and what we are still working on."
	/>

	<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
		{#each pledges as p, i}
			<Reveal delay={Math.min(i, 3) * 60}>
				<div class="h-full rounded-[2rem] bg-white p-7 shadow-card">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold"><p.Icon size={24} weight="thin" /></span>
					<h2 class="mt-4 font-display text-2xl font-semibold">{p.title}</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
				</div>
			</Reveal>
		{/each}
	</div>

	<Reveal>
		<div class="mt-10 rounded-[2rem] bg-white p-7 shadow-card sm:p-9">
			<h2 class="font-display text-2xl font-semibold">What we are still working on</h2>
			<p class="mt-3 text-sm leading-relaxed text-ink-soft">
				We are not finished. The refill programme is not live yet, our shipping is not carbon-neutral, and
				some of our raw materials still travel further than we would like. We publish this page so you can
				hold us to it — and we will update it as each of those things changes, rather than claiming them
				before they are true.
			</p>
			<a href="/about/" class="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold">
				Our Story <ArrowRight size={16} weight="bold" />
			</a>
		</div>
	</Reveal>
</section>
