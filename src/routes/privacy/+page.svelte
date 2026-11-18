<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
</script>

<svelte:head>
	<title>Privacy Policy — Lumière Parfums</title>
	<meta name="description" content="Privacy policy for Lumière Parfums — what we collect, why, and how to ask us to delete it." />
</svelte:head>

<section class="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero eyebrow="Legal" title="Privacy Policy" sub="Last updated: November 2026. This is the demo storefront’s policy — short, plain, and honest about what happens to your data." />
	<Reveal>
		<div class="mt-10 space-y-8 rounded-[2rem] bg-white p-6 text-sm leading-relaxed text-ink-soft shadow-card sm:p-8">
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">What we collect</h2>
				<p class="mt-2">When you shop with us, we collect the details you give us: your name, email address, shipping address and payment details (handled by the payment step — card numbers are never stored by us). When you join the newsletter, we collect your email address. When you browse, your bag, wishlist and demo sign-in are saved in your own browser’s local storage — on your device, not on our servers.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Why we collect it</h2>
				<p class="mt-2">To fulfil your order, deliver it, tell you where it is, handle returns, and — only if you asked — send you news about new scents and offers. We do not sell your data, and we do not share it with advertisers.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">How long we keep it</h2>
				<p class="mt-2">Order records are kept for as long as the law requires for accounting and returns — normally seven years. Newsletter addresses are kept until you unsubscribe. Anything stored in your browser (bag, wishlist, demo account) disappears the moment you clear your browser data.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Your rights</h2>
				<p class="mt-2">You can ask us at any time for a copy of the data we hold about you, ask us to correct it, or ask us to delete it. Write to us from the <a href="/contact/" class="font-semibold text-gold underline underline-offset-2">Contact page</a> and we will answer within two business days.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Cookies</h2>
				<p class="mt-2">This demo storefront does not set tracking cookies. The only things stored are the local-storage items above (bag, wishlist, demo sign-in and demo orders), which stay on your device.</p>
			</section>
			<section>
				<h2 class="font-display text-xl font-semibold text-ink">Changes</h2>
				<p class="mt-2">If this policy changes, the new version is published here with a new “last updated” date. The version that applies to your order is the one in force when you placed it.</p>
			</section>
		</div>
	</Reveal>
</section>
