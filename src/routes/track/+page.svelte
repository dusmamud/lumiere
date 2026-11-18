<script lang="ts">
	import { page } from '$app/state';
	import { MagnifyingGlass, Package } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	interface StoredOrder {
		no: string;
		date: string;
		total: string;
		items: number;
		name: string;
	}

	let query = $state('');
	let lookedUp = $state(false);
	let found = $state<StoredOrder | null>(null);
	let notFound = $state(false);

	// ?no=LM-123456 pre-fills the lookup after mount (prerender-safe).
	$effect(() => {
		const no = page.url.searchParams.get('no');
		if (no && !lookedUp) {
			query = no;
			lookup();
		}
	});

	function lookup(e?: SubmitEvent) {
		e?.preventDefault();
		const needle = query.trim().toUpperCase();
		if (!needle) return;
		lookedUp = true;
		notFound = false;
		found = null;
		try {
			const raw = localStorage.getItem('lumiere:orders');
			const orders = raw ? (JSON.parse(raw) as StoredOrder[]) : [];
			found = orders.find((o) => o.no.toUpperCase() === needle) ?? null;
			notFound = !found;
		} catch {
			notFound = true;
		}
	}

	const timeline = [
		{ label: 'Order placed', text: 'Your demo order was confirmed and the atelier was notified.' },
		{ label: 'Packed', text: 'Your bottles are wrapped in the signature box with a complimentary sample.' },
		{ label: 'Shipped', text: 'Your parcel leaves the atelier with a tracking link sent to your email.' },
		{ label: 'Delivered', text: 'Your fragrance arrives — wear it well.' }
	];
</script>

<svelte:head>
	<title>Track Order — Lumière Parfums</title>
	<meta name="description" content="Track your Lumière Parfums demo order by its LM- order number." />
</svelte:head>

<section class="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Track Order"
		title="Where Is My Order?"
		sub="Enter your order number (LM-XXXXXX) to see its status. Demo orders placed on this device are remembered here."
	/>

	<form onsubmit={lookup} class="mt-10 flex gap-2" role="search">
		<div class="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 focus-within:border-gold">
			<MagnifyingGlass size={19} class="shrink-0 text-ink-soft" />
			<label for="track-no" class="sr-only">Order number</label>
			<input
				id="track-no"
				type="text"
				bind:value={query}
				placeholder="LM-123456"
				autocomplete="off"
				class="h-full min-w-0 flex-1 bg-transparent uppercase outline-none placeholder:text-ink-soft/60 placeholder:normal-case"
			/>
		</div>
		<button type="submit" class="h-12 shrink-0 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-gold">
			Track
		</button>
	</form>

	{#if found}
		<Reveal>
			<div class="mt-8 rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold"><Package size={26} /></span>
				<h2 class="mt-4 font-display text-2xl font-semibold">Order {found.no}</h2>
				<p class="mt-1 text-sm text-ink-soft">Placed {found.date} · {found.items} {found.items === 1 ? 'item' : 'items'} · ${found.total}</p>
				<ol class="mt-6 space-y-5">
					{#each timeline as t, i}
						<li class="flex gap-4">
							<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full {i === 0 ? 'bg-gold text-white' : 'bg-cream text-ink-soft'} text-sm font-bold">{i + 1}</span>
							<div>
								<p class="font-semibold">{t.label}</p>
								<p class="mt-0.5 text-sm text-ink-soft">{t.text}</p>
							</div>
						</li>
					{/each}
				</ol>
				<p class="mt-6 text-xs leading-relaxed text-ink-soft">
					Demo order — the timeline above is illustrative. A real order would show live carrier updates here.
				</p>
			</div>
		</Reveal>
	{:else if notFound}
		<Reveal>
			<div class="mt-8 rounded-[2rem] bg-white p-8 text-center shadow-card">
				<p class="font-display text-2xl font-semibold">We could not find “{query.trim().toUpperCase()}”</p>
				<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
					Order numbers look like LM-123456 and are shown on the confirmation after checkout. Only demo
					orders placed on this device can be found here — orders placed on another device or browser
					will not appear.
				</p>
				<p class="mt-3 text-sm text-ink-soft">
					Check the number and try again, or <a href="/contact/" class="font-semibold text-gold underline underline-offset-2">contact us</a>.
				</p>
			</div>
		</Reveal>
	{/if}
</section>
