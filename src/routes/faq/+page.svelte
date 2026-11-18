<script lang="ts">
	import { Plus } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	const faqs = [
		{
			q: 'How long does a Lumière fragrance last on skin?',
			a: 'Our eaux de parfum are composed to last a full day — the bright top notes fade within the first hour, the heart carries the afternoon, and the base notes are still there in the evening. Longevity varies with skin type and weather; dry skin and cold air both shorten wear, so moisturised skin holds scent longest.'
		},
		{
			q: 'What is the difference between the 50ml and 100ml bottles?',
			a: 'The scent inside is identical — only the bottle size changes. The 100ml bottle is the listed price; the 50ml bottle is $25 less. Both are the same eau de parfum concentration.'
		},
		{
			q: 'How do I find my signature scent?',
			a: 'Start with a discovery set: five 2ml vials to wear at home, one per day, on skin. Judge each scent at noon, not in the first five minutes — the dry-down is the part you live with. The vial that empties first is your answer.'
		},
		{
			q: 'Do you offer free shipping?',
			a: 'Yes — shipping is free on all orders over $75. Below that, standard shipping (3–5 business days) is a flat $6.95 and express shipping (1–2 business days) is $14.95. Orders ship within 2 business days.'
		},
		{
			q: 'What samples do I get with my order?',
			a: 'Every order includes a complimentary sample, chosen by the house to complement what you bought. If you would like a specific sample, mention it in the order notes at checkout and we will include it when we can.'
		},
		{
			q: 'What is your return policy?',
			a: 'Unopened bottles can be returned within 30 days of delivery for a full refund. Opened bottles cannot be returned for hygiene reasons, unless the bottle arrived damaged or faulty — in that case, contact us within 14 days and we will replace it or refund it.'
		},
		{
			q: 'How should I store my perfume?',
			a: 'Keep it away from direct sunlight and heat — a cool, dark drawer or cupboard is ideal. Avoid storing it in the bathroom, where steam and temperature swings age a fragrance faster. Stored well, an eau de parfum keeps its character for several years.'
		},
		{
			q: 'Are your fragrances suitable for sensitive skin?',
			a: 'Our scents are composed to cosmetic standards and patch-tested, but fragrance is personal: if you have sensitive skin or a known allergy, spray on clothing first, or test a small amount on the inside of your wrist and wait 24 hours before wearing it fully.'
		},
		{
			q: 'Can I send a fragrance as a gift?',
			a: 'Yes. Every fragrance can be gift-wrapped in our signature box with a black ribbon and a hand-written message card — choose gift wrap at checkout. Gift cards are also available if you would rather let them choose.'
		},
		{
			q: 'When will perfume oils and rollers be available?',
			a: 'The same scents as concentrated perfume oils and 10ml rollers are on their way. Until they arrive, the full bottles in the shop are the same compositions — the oils will simply wear closer to the skin. Join the newsletter in the footer and we will tell you the moment they launch.'
		}
	];
</script>

<svelte:head>
	<title>FAQ — Lumière Parfums</title>
	<meta name="description" content="Frequently asked questions about Lumière Parfums — longevity, bottle sizes, discovery sets, shipping, returns and gifting." />
</svelte:head>

<section class="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Help"
		title="Frequently Asked Questions"
		sub="Everything about wearing, choosing and sending a Lumière fragrance. Still stuck? Write to us from the Contact page."
	/>
	<div class="mt-10 divide-y divide-line rounded-[2rem] bg-white px-6 shadow-card sm:px-8">
		{#each faqs as f, i}
			<Reveal delay={Math.min(i, 5) * 30}>
				<details class="group py-5" name="faq">
					<summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg leading-snug font-semibold [&::-webkit-details-marker]:hidden">
						{f.q}
						<Plus size={18} weight="bold" class="shrink-0 transition-transform group-open:rotate-45" />
					</summary>
					<p class="pt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
				</details>
			</Reveal>
		{/each}
	</div>
	<p class="mt-8 text-center text-sm text-ink-soft">
		Still have a question? <a href="/contact/" class="font-semibold text-gold underline underline-offset-2 hover:text-ink">Contact us</a> — we answer within two business days.
	</p>
</section>
