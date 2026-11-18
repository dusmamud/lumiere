<script lang="ts">
	import { ArrowRight, Drop, FlowerLotus, Heart, Sparkle } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	const values = [
		{ title: 'Finest Ingredients', text: 'Damask rose picked before sunrise, sandalwood aged before distillation, vanilla that is dark and resinous. A fragrance is only as good as what goes into it.', Icon: FlowerLotus },
		{ title: 'Small Batches', text: 'Every scent is macerated for weeks and bottled in small runs, so what you wear is the perfumer’s final judgement — never a rushed first draft.', Icon: Drop },
		{ title: 'Made With Passion', text: 'One sentence on a card above the bench — “the smell of rain on warm stone” — and months of work until the scent answers it.', Icon: Heart },
		{ title: 'Worn Every Day', text: 'Lumière scents are made to be lived in, not saved for occasions. The best compliment is someone asking what you are wearing.', Icon: Sparkle }
	];
</script>

<svelte:head>
	<title>Our Story — Lumière Parfums</title>
	<meta name="description" content="The story of Lumière Parfums — small-batch luxury fragrances, composed from the finest ingredients from around the world." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Our Story"
		title="Scents That Leave a Lasting Impression"
		sub="Lumière Parfums began with a simple belief: a fragrance should be remembered long after the person wearing it has left the room."
	/>

	<Reveal>
		<div class="mt-10 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-2">
			<img
				src="/images/journal-atelier.webp"
				alt="Inside the Lumière atelier — bottles, beakers and raw materials on the perfumer’s bench"
				width="1000"
				height="750"
				fetchpriority="high"
				class="aspect-[4/3] h-full w-full object-cover"
			/>
			<div class="p-7 sm:p-10">
				<h2 class="font-display text-3xl font-semibold">The house</h2>
				<p class="mt-4 leading-relaxed text-ink-soft">
					Lumière is a small house with a slow process. We do not release a scent every season; we release
					one when it is ready. Each fragrance starts as a single sentence pinned above the perfumer’s
					bench, and is blended, rested, macerated and worn on skin for weeks before it is ever bottled.
				</p>
				<p class="mt-4 leading-relaxed text-ink-soft">
					The result is a catalogue of twelve scents — floral, woody, fresh, oriental and gourmand — each
					composed to be worn every day and remembered always.
				</p>
				<a href="/journal/inside-the-atelier/" class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold">
					Inside the Atelier <ArrowRight size={16} weight="bold" />
				</a>
			</div>
		</div>
	</Reveal>

	<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
		{#each values as v, i}
			<Reveal delay={Math.min(i, 3) * 60}>
				<div class="h-full rounded-[2rem] bg-white p-7 shadow-card">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold"><v.Icon size={24} weight="thin" /></span>
					<h3 class="mt-4 font-display text-2xl font-semibold">{v.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
				</div>
			</Reveal>
		{/each}
	</div>

	<Reveal>
		<div class="mt-12 rounded-[2rem] bg-ink p-8 text-center text-white sm:p-12">
			<h2 class="font-display text-3xl font-semibold">Find the scent that feels like you.</h2>
			<p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75">
				Start with a discovery set, or browse the full collection — every order ships free over $75 and
				includes a complimentary sample.
			</p>
			<div class="mt-7 flex flex-wrap justify-center gap-3">
				<a href="/discovery-sets/" class="flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[13px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-gold hover:text-white">
					Discovery Sets <ArrowRight size={16} weight="bold" />
				</a>
				<a href="/shop/" class="flex h-12 items-center gap-2 rounded-full border border-white/30 px-7 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:border-gold hover:text-gold">
					Shop All Fragrances
				</a>
			</div>
		</div>
	</Reveal>
</section>
