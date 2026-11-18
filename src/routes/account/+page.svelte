<script lang="ts">
	import { browser } from '$app/env';
	import { ArrowRight, Heart, Package, SignOut, User } from 'phosphor-svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { wishlist } from '#lib/store.svelte';
	import { toast } from '#lib/toast.svelte';

	interface StoredOrder {
		no: string;
		date: string;
		total: string;
		items: number;
		name: string;
	}

	interface StoredUser {
		email: string;
		name: string;
	}

	let user = $state<StoredUser | null>(null);
	let orders = $state<StoredOrder[]>([]);

	$effect(() => {
		if (!browser) return;
		try {
			const rawUser = localStorage.getItem('lumiere:user');
			user = rawUser ? (JSON.parse(rawUser) as StoredUser) : null;
			const rawOrders = localStorage.getItem('lumiere:orders');
			orders = rawOrders ? (JSON.parse(rawOrders) as StoredOrder[]) : [];
		} catch {
			user = null;
			orders = [];
		}
	});

	function signOut() {
		if (browser) localStorage.removeItem('lumiere:user');
		user = null;
		toast.info('Signed out (demo)');
	}
</script>

<svelte:head>
	<title>My Account — Lumière Parfums</title>
	<meta name="description" content="Your Lumière Parfums demo account — orders and wishlist, saved on this device." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="My Account"
		title={user ? `Hello, ${user.name}` : 'My Account'}
		sub={user ? `Signed in as ${user.email} (demo account, stored only on this device).` : 'Demo account — sign in to see your details, or keep browsing as a guest.'}
	/>

	<div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Profile card -->
		<div class="rounded-[2rem] bg-white p-6 shadow-card sm:p-7">
			<span class="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold"><User size={26} /></span>
			<h2 class="mt-4 font-display text-2xl font-semibold">Profile</h2>
			{#if user}
				<p class="mt-2 text-sm leading-relaxed text-ink-soft">Name: {user.name}</p>
				<p class="mt-1 text-sm leading-relaxed text-ink-soft">Email: {user.email}</p>
				<button
					type="button"
					onclick={signOut}
					class="mt-5 flex h-12 items-center gap-2 rounded-full border border-line px-6 text-sm font-semibold transition-colors hover:border-gold hover:text-gold"
				>
					<SignOut size={17} /> Sign Out
				</button>
			{:else}
				<p class="mt-2 text-sm leading-relaxed text-ink-soft">You are browsing as a guest. Sign in to keep your details on this device.</p>
				<a href="/signin/" class="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-gold">
					Sign In <ArrowRight size={16} weight="bold" />
				</a>
			{/if}
			<a href="/wishlist/" class="mt-4 flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-gold transition-colors hover:bg-cream">
				<Heart size={18} weight={wishlist.slugs.length ? 'fill' : 'regular'} />
				My Wishlist — {wishlist.slugs.length} {wishlist.slugs.length === 1 ? 'fragrance' : 'fragrances'}
			</a>
		</div>

		<!-- Orders -->
		<div class="rounded-[2rem] bg-white p-6 shadow-card sm:p-7 lg:col-span-2">
			<h2 class="flex items-center gap-2 font-display text-2xl font-semibold"><Package size={24} /> Order History</h2>
			{#if orders.length}
				<ul class="mt-5 divide-y divide-line">
					{#each orders as o (o.no)}
						<li class="flex flex-wrap items-center justify-between gap-3 py-4">
							<div>
								<p class="font-semibold">{o.no}</p>
								<p class="mt-0.5 text-sm text-ink-soft">{o.date} · {o.items} {o.items === 1 ? 'item' : 'items'}</p>
							</div>
							<span class="text-base font-bold">${o.total}</span>
							<a href="/track/?no={encodeURIComponent(o.no)}" class="flex h-11 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-semibold transition-colors hover:border-gold hover:text-gold">
								Track <ArrowRight size={15} weight="bold" />
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="mt-4 text-sm leading-relaxed text-ink-soft">
					No orders on this device yet. Orders placed through the demo checkout appear here and can be
					looked up on the <a href="/track/" class="font-semibold text-gold underline underline-offset-2">Track Order</a> page.
				</p>
				<a href="/shop/" class="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-gold">
					Shop fragrances <ArrowRight size={16} weight="bold" />
				</a>
			{/if}
		</div>
	</div>
</section>
