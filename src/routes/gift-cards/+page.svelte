<script lang="ts">
	import { ArrowRight, Check, Gift } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { toast } from '#lib/toast.svelte';

	const amounts = [50, 75, 100, 150, 200];
	let amount = $state(100);
	let recipient = $state('');
	let message = $state('');
	let sent = $state(false);

	function sendGiftCard(e: SubmitEvent) {
		e.preventDefault();
		if (!recipient.trim()) return toast.error('Please enter the recipient’s name');
		sent = true;
		toast.success('Demo gift card created — no charge was made');
	}
</script>

<svelte:head>
	<title>Gift Cards — Lumière Parfums</title>
	<meta name="description" content="Lumière Parfums gift cards — let them choose their own signature scent. Demo page." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Gift Cards"
		title="Let Them Choose"
		sub="Not sure which scent is theirs? A gift card lets them find their own signature — and it never expires."
	/>

	<div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
		<Reveal>
			<div class="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-card sm:p-10">
				<img
					src="/images/gift-box.webp"
					alt="Lumière gift box with a black ribbon beside a bottle of Éclat Noir"
					loading="lazy"
					width="800"
					height="600"
					class="absolute inset-0 h-full w-full object-cover opacity-25"
				/>
				<div class="relative">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gold-soft"><Gift size={24} /></span>
					<p class="mt-6 text-[11px] font-semibold tracking-[0.35em] text-gold-soft uppercase">Lumière Parfums</p>
					<p class="mt-2 font-display text-5xl font-semibold">${amount.toFixed(2)}</p>
					<p class="mt-4 text-sm leading-relaxed text-white/75">
						Redeemable against any fragrance, discovery set or gift in the shop. Delivered by email,
						beautifully presented, with your message inside.
					</p>
					<ul class="mt-6 space-y-2 text-sm text-white/80">
						<li class="flex gap-2"><Check size={17} weight="bold" class="mt-0.5 shrink-0 text-gold-soft" /> Never expires</li>
						<li class="flex gap-2"><Check size={17} weight="bold" class="mt-0.5 shrink-0 text-gold-soft" /> Usable in one order or across several</li>
						<li class="flex gap-2"><Check size={17} weight="bold" class="mt-0.5 shrink-0 text-gold-soft" /> Free shipping still applies over $75</li>
					</ul>
				</div>
			</div>
		</Reveal>

		<Reveal delay={80}>
			{#if sent}
				<div class="rounded-[2rem] bg-white p-8 text-center shadow-card sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-emerald-700"><Check size={30} weight="bold" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold">Demo gift card ready</h2>
					<p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
						A ${amount.toFixed(2)} gift card for <strong class="text-ink">{recipient}</strong> would be sent
						with your message. No charge was made — this is a demonstration.
					</p>
					<button
						type="button"
						onclick={() => {
							sent = false;
							recipient = '';
							message = '';
						}}
						class="mt-6 h-12 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold"
					>
						Create another
					</button>
				</div>
			{:else}
				<form onsubmit={sendGiftCard} class="rounded-[2rem] bg-white p-6 shadow-card sm:p-8" novalidate>
					<h2 class="font-display text-2xl font-semibold">Create a Gift Card</h2>
					<fieldset class="mt-6">
						<legend class="text-sm font-semibold">Choose an amount</legend>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each amounts as a}
								<button
									type="button"
									onclick={() => (amount = a)}
									aria-pressed={amount === a}
									class="flex h-12 min-w-20 items-center justify-center rounded-full border px-5 text-sm font-semibold transition-colors {amount === a
										? 'border-ink bg-ink text-white'
										: 'border-line bg-white hover:border-gold hover:text-gold'}"
								>
									${a}
								</button>
							{/each}
						</div>
					</fieldset>
					<div class="mt-5">
						<label for="gc-recipient" class="text-sm font-semibold">Recipient’s name</label>
						<input id="gc-recipient" type="text" bind:value={recipient} placeholder="For whom is this?" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
					</div>
					<div class="mt-5">
						<label for="gc-message" class="text-sm font-semibold">Your message <span class="font-normal text-ink-soft">(optional)</span></label>
						<textarea id="gc-message" bind:value={message} rows="3" placeholder="A few words to go with it…" class="mt-2 w-full resize-none rounded-3xl border border-line bg-cream/60 px-5 py-3 outline-none focus:border-gold"></textarea>
					</div>
					<button type="submit" class="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold">
						<Gift size={18} /> Create Gift Card — ${amount.toFixed(2)}
					</button>
					<p class="mt-4 text-center text-xs leading-relaxed text-ink-soft">
						Demo only — no payment is taken and no gift card is actually sent.
					</p>
				</form>
			{/if}
		</Reveal>
	</div>

	<p class="mt-10 text-center text-sm text-ink-soft">
		Rather give a bottle? <a href="/collections/gift-sets/" class="font-semibold text-gold underline underline-offset-2">Browse gift sets</a>
		<ArrowRight size={15} weight="bold" class="inline" />
	</p>
</section>
