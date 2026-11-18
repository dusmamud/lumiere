<script lang="ts">
	import { page } from '$app/state';
	import { CaretDown, List, MagnifyingGlass, ShoppingBag, User, X } from 'phosphor-svelte';
	import { cart, ui } from '#lib/store.svelte';

	const shopLinks = [
		{ href: '/shop/womens', label: "Women's" },
		{ href: '/shop/mens', label: "Men's" },
		{ href: '/shop/unisex', label: 'Unisex' },
		{ href: '/shop', label: 'All Fragrances' }
	];

	const links = [
		{ href: '/best-sellers', label: 'BEST SELLERS' },
		{ href: '/collections', label: 'COLLECTIONS' },
		{ href: '/discovery-sets', label: 'DISCOVERY SETS' },
		{ href: '/about', label: 'ABOUT' },
		{ href: '/journal', label: 'JOURNAL' }
	];

	let shopOpen = $state(false);

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	$effect(() => {
		// Close the mobile menu whenever the route changes.
		void page.url.pathname;
		ui.menuOpen = false;
		shopOpen = false;
	});

	$effect(() => {
		// Lock body scroll while the full-height mobile menu is open.
		document.body.style.overflow = ui.menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<!-- Black announcement bar -->
<div class="bg-ink text-center text-[11px] font-medium tracking-[0.14em] text-white uppercase">
	<p class="px-4 py-2.5">FREE SHIPPING ON ORDERS OVER $75&nbsp;&nbsp;|&nbsp;&nbsp;COMPLIMENTARY SAMPLES WITH EVERY ORDER</p>
</div>

<header class="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
	<div class="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-4 sm:h-[72px] sm:gap-3 sm:px-6 lg:px-8">
		<button
			type="button"
			onclick={() => (ui.menuOpen = !ui.menuOpen)}
			class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-cream lg:hidden"
			aria-label={ui.menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={ui.menuOpen}
		>
			{#if ui.menuOpen}<X size={22} />{:else}<List size={22} />{/if}
		</button>

		<a href="/" class="flex min-h-11 flex-col items-center justify-center leading-none" aria-label="Lumière Parfums home">
			<span class="font-display text-[22px] font-semibold tracking-[0.28em] text-ink sm:text-2xl">LUMIÈRE</span>
			<span class="mt-1 text-[9px] font-medium tracking-[0.5em] text-gold uppercase">Parfums</span>
		</a>

		<nav class="mx-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
			<div class="relative">
				<button
					type="button"
					onclick={() => (shopOpen = !shopOpen)}
					aria-expanded={shopOpen}
					aria-haspopup="true"
					class="flex h-11 items-center gap-1 rounded-full px-3.5 text-[13px] font-medium tracking-[0.08em] transition-colors {isActive('/shop')
						? 'font-semibold text-gold'
						: 'text-ink hover:bg-cream hover:text-ink'}"
				>
					SHOP <CaretDown size={13} weight="bold" class="transition-transform {shopOpen ? 'rotate-180' : ''}" />
				</button>
				{#if shopOpen}
					<div
						class="absolute top-full left-0 min-w-52 rounded-2xl border border-line bg-white py-2 shadow-lift"
						role="menu"
					>
						{#each shopLinks as link}
							<a
								href={link.href}
								role="menuitem"
								onclick={() => (shopOpen = false)}
								class="flex h-11 items-center px-4 text-sm font-medium text-ink transition-colors hover:bg-cream hover:text-gold"
							>
								{link.label}
							</a>
						{/each}
					</div>
				{/if}
			</div>
			{#each links as link}
				<a
					href={link.href}
					aria-current={isActive(link.href) ? 'page' : undefined}
					class="flex h-11 items-center rounded-full px-3.5 text-[13px] font-medium tracking-[0.08em] transition-colors {isActive(link.href)
						? 'font-semibold text-gold'
						: 'text-ink hover:bg-cream hover:text-ink'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-0">
			<button
				type="button"
				onclick={() => (ui.searchOpen = true)}
				class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
				aria-label="Search fragrances"
			>
				<MagnifyingGlass size={20} />
			</button>
			<a
				href="/account"
				class="hidden h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream sm:flex"
				aria-label="Your account"
			>
				<User size={20} />
			</a>
			<button
				type="button"
				onclick={() => (ui.cartOpen = true)}
				class="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
				aria-label="Open cart, {cart.count} items"
			>
				<ShoppingBag size={20} />
				{#if cart.count > 0}
					{#key cart.count}
						<span
							class="cart-badge-bump absolute top-0.5 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-white"
						>
							{cart.count}
						</span>
					{/key}
				{/if}
			</button>
		</div>
	</div>
</header>

{#if ui.menuOpen}
	<div class="fixed inset-0 top-[calc(2.5rem+4rem)] z-40 overflow-y-auto bg-white lg:hidden" role="dialog" aria-label="Menu">
		<nav class="flex flex-col px-6 py-6" aria-label="Mobile">
			<a href="/shop" class="flex min-h-12 items-center border-b border-line text-base font-medium tracking-wide">SHOP</a>
			<div class="flex flex-col border-b border-line py-1 pl-4">
				{#each shopLinks as link}
					<a href={link.href} class="flex min-h-11 items-center text-sm text-ink-soft">{link.label}</a>
				{/each}
			</div>
			{#each links as link}
				<a href={link.href} class="flex min-h-12 items-center border-b border-line text-base font-medium tracking-wide">{link.label}</a>
			{/each}
			<a href="/account" class="flex min-h-12 items-center border-b border-line text-base font-medium tracking-wide">ACCOUNT</a>
		</nav>
	</div>
{/if}
