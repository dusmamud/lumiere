<script lang="ts">
	import { ArrowRight, Check, Sparkle } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { products } from '#lib/data/products';

	// Demo set options — each set is five 2ml vials from the real catalogue.
	const sets = [
		{
			name: 'The Floral Set',
			price: 45,
			blurb: 'For lovers of white flowers and soft roses.',
			scents: ['rose-eternelle', 'lumiere-blanche', 'fleur-de-minuit', 'pivoine-royale', 'neroli-blanc']
		},
		{
			name: 'The Warm & Woody Set',
			price: 45,
			blurb: 'Amber, sandalwood and oud — scents that glow.',
			scents: ['santal-dore', 'velvet-ambre', 'oud-royal', 'bois-sacre', 'vanille-noir']
		},
		{
			name: 'The Fresh Set',
			price: 45,
			blurb: 'Bright, clean and effortless — citrus, neroli and musk.',
			scents: ['citrus-noir', 'neroli-blanc', 'musc-blanc', 'lumiere-blanche', 'santal-dore']
		}
	];

	function scentName(slug: string): string {
		return products.find((p) => p.slug === slug)?.name ?? slug;
	}
</script>

<svelte:head>
	<title>Discovery Sets — Lumière Parfums</title>
	<meta name="description" content="Try five Lumière fragrances at home before choosing a full bottle. Three discovery sets — floral, warm & woody, and fresh." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Discovery Sets"
		title="Find Your Signature Scent"
		sub="Five 2ml vials, one per day, worn on skin. When one vial runs out before the others, you have your answer."
	/>

	<Reveal>
		<div class="mt-10 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-10 lg:grid-cols-2">
			<img
				src="/images/discovery-set.webp"
				alt="Lumière discovery set — five small vials in a black gift box"
				width="1000"
				height="750"
				fetchpriority="high"
				class="aspect-[4/3] w-full rounded-3xl object-cover"
			/>
			<div>
				<p class="flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] text-gold-soft uppercase">
					<Sparkle size={16} /> How it works
				</p>
				<h2 class="mt-3 font-display text-3xl font-semibold">Five days. Five scents. One decision.</h2>
				<ul class="mt-5 space-y-3 text-sm leading-relaxed text-white/80">
					<li class="flex gap-3"><Check size={18} weight="bold" class="mt-0.5 shrink-0 text-gold-soft" /> Wear one vial per day, on skin — never on paper.</li>
					<li class="flex gap-3"><Check size={18} weight="bold" class="mt-0.5 shrink-0 text-gold-soft" /> Judge it at noon, not in the first five minutes — the dry-down is the scent you live with.</li>
					<li class="flex gap-3"><Check size={18} weight="bold" class="mt-0.5 shrink-0 text-gold-soft" /> The vial that empties first is your signature. The full bottle is waiting in the shop.</li>
				</ul>
				<p class="mt-5 text-sm text-white/60">
					Demo page — discovery sets are shown here as options; the full bottles are available to buy now.
				</p>
			</div>
		</div>
	</Reveal>

	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each sets as set, i}
			<Reveal delay={i * 80}>
				<article class="flex h-full flex-col rounded-[2rem] bg-white p-7 shadow-card">
					<h2 class="font-display text-2xl font-semibold">{set.name}</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">{set.blurb}</p>
					<ul class="mt-5 flex-1 space-y-2.5">
						{#each set.scents as slug}
							<li>
								<a href="/product/{slug}/" class="flex items-center gap-2 text-sm font-medium hover:text-gold">
									<Check size={16} weight="bold" class="shrink-0 text-gold" /> {scentName(slug)}
								</a>
							</li>
						{/each}
					</ul>
					<p class="mt-6 text-2xl font-semibold">${set.price.toFixed(2)} <span class="text-sm font-normal text-ink-soft">/ set of five 2ml vials</span></p>
					<a
						href="/shop/"
						class="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold"
					>
						Shop These Scents <ArrowRight size={16} weight="bold" />
					</a>
				</article>
			</Reveal>
		{/each}
	</div>
</section>
