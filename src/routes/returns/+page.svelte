<script lang="ts">
	import { ArrowRight, ArrowsCounterClockwise, Check, Package } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	const steps = [
		{ title: '1. Write to us', text: 'Within 30 days of delivery, contact us with your order number (LM-XXXXXX) and the item you would like to return.' },
		{ title: '2. Pack it up', text: 'Place the unopened bottle in its original box, with the cap on and the seal intact. Use the same protective packing it arrived in.' },
		{ title: '3. Send it back', text: 'We will send you a return label. Post the parcel within 7 days of receiving the label.' },
		{ title: '4. Refund', text: 'Once the return arrives and is checked, your refund goes back to the original payment method within 5 business days.' }
	];
</script>

<svelte:head>
	<title>Returns &amp; Exchanges — Lumière Parfums</title>
	<meta name="description" content="Returns at Lumière Parfums — unopened bottles returned within 30 days for a full refund. Damaged or faulty bottles replaced or refunded." />
</svelte:head>

<section class="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Help"
		title="Returns & Exchanges"
		sub="Changed your mind? Unopened bottles can be returned within 30 days of delivery for a full refund."
	/>

	<Reveal>
		<div class="mt-10 flex gap-4 rounded-[2rem] bg-white p-6 shadow-card sm:p-7">
			<ArrowsCounterClockwise size={26} class="mt-0.5 shrink-0 text-gold" />
			<div>
				<h2 class="font-display text-xl font-semibold">The short version</h2>
				<p class="mt-2 text-sm leading-relaxed text-ink-soft">
					Unopened, sealed bottles: return within 30 days for a full refund. Opened bottles: cannot be
					returned, for hygiene reasons — unless the bottle arrived damaged or faulty, in which case we
					replace it or refund it. Discovery sets and samples are final sale.
				</p>
			</div>
		</div>
	</Reveal>

	<div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
		{#each steps as s, i}
			<Reveal delay={Math.min(i, 3) * 60}>
				<div class="h-full rounded-[2rem] bg-white p-6 shadow-card">
					<span class="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-gold"><Package size={22} weight="thin" /></span>
					<h3 class="mt-4 font-display text-xl font-semibold">{s.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
				</div>
			</Reveal>
		{/each}
	</div>

	<Reveal>
		<div class="mt-8 rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-semibold"><Check size={22} class="text-gold" /> Good to know</h2>
			<ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
				<li>Refunds go back to the original payment method — never to a different card or account.</li>
				<li>Return shipping is free when the bottle arrived damaged or faulty; for change-of-mind returns, the customer covers the return postage.</li>
				<li>If you are unsure about a scent, try the discovery set first — five vials at home is cheaper than a returned bottle.</li>
				<li>Gift recipients can exchange an unopened bottle for any other fragrance of the same value, with the order number.</li>
			</ul>
		</div>
	</Reveal>

	<a href="/contact/" class="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
		Start a Return <ArrowRight size={16} weight="bold" />
	</a>
</section>
