<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
</script>

<svelte:head>
	<title>Terms of Service — Lumière Parfums</title>
	<meta name="description" content="Terms of service for Lumière Parfums — ordering, payment, delivery, returns and the demo nature of this storefront." />
</svelte:head>

<section class="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero eyebrow="Legal" title="Terms of Service" sub="Last updated: November 2026. Please read these terms before ordering — they are the agreement between you and Lumière Parfums." />
	<Reveal>
		<div class="mt-10 space-y-8 rounded-[2rem] bg-white p-6 text-sm leading-relaxed text-ink-soft shadow-card sm:p-8">
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">The demo storefront</h2>
				<p class="mt-2">This is a demonstration storefront. Checkout does not take a real payment, no card is charged, and no order is actually shipped. Prices, availability and policies shown here describe the house’s real terms; the checkout itself is a demo.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Ordering and payment</h2>
				<p class="mt-2">Prices are shown in US dollars and include taxes where applicable. Payment is taken at the time of ordering. We accept major credit and debit cards. An order is confirmed only when you see the confirmation screen and receive an order number (LM-XXXXXX).</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Delivery</h2>
				<p class="mt-2">Orders ship within 2 business days. Delivery times (standard 3–5 days, express 1–2 days) are estimates, not guarantees — customs and carriers can add time. Risk passes to you when the parcel is delivered to the address you gave us.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Returns</h2>
				<p class="mt-2">Unopened bottles can be returned within 30 days of delivery for a full refund. Opened bottles cannot be returned for hygiene reasons, unless damaged or faulty. The full policy is on the <a href="/returns/" class="font-semibold text-gold underline underline-offset-2">Returns page</a>.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Our fragrances</h2>
				<p class="mt-2">Fragrance is personal: the same scent smells different on different skin, and colours of natural materials can vary slightly between batches. The product photographs show the bottle and the juice as accurately as we can; small differences in shade are normal and are not a fault.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Intellectual property</h2>
				<p class="mt-2">The Lumière Parfums name, logo, bottle designs, photographs and words on this site belong to the house. Do not copy, reproduce or use them without written permission.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Liability</h2>
				<p class="mt-2">Our liability for any order is limited to the price you paid for it. Nothing in these terms limits liability that cannot legally be limited.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Changes</h2>
				<p class="mt-2">We may update these terms from time to time. The version that applies to your order is the one in force when you placed it.</p>
			</section>
		</div>
	</Reveal>
</section>
