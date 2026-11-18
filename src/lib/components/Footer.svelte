<script lang="ts">
	import { ArrowRight, FacebookLogo, InstagramLogo, PinterestLogo, TiktokLogo } from 'phosphor-svelte';
	import { toast } from '#lib/toast.svelte';

	let email = $state('');
	let subscribed = $state(false);

	function subscribe(e: SubmitEvent) {
		e.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			toast.error('Please enter a valid email address');
			return;
		}
		subscribed = true;
		toast.success('Welcome to Lumière — you are on the list');
	}
</script>

<footer class="bg-ink text-white">
	<!-- Newsletter -->
	<div class="border-b border-white/10">
		<div class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
			<div class="max-w-md">
				<h2 class="font-display text-2xl font-semibold tracking-wide sm:text-3xl">STAY IN THE KNOW</h2>
				<p class="mt-2 text-sm leading-relaxed text-white/70">
					Be the first to discover new scents and exclusive offers.
				</p>
			</div>
			{#if subscribed}
				<p class="rounded-full border border-gold/50 px-6 py-3 text-sm font-medium text-gold-soft" role="status">
					Thank you — you are subscribed.
				</p>
			{:else}
				<form onsubmit={subscribe} class="flex w-full max-w-md gap-2" aria-label="Newsletter signup">
					<label for="newsletter-email" class="sr-only">Email address</label>
					<input
						id="newsletter-email"
						type="email"
						bind:value={email}
						placeholder="Your email address"
						autocomplete="email"
						required
						class="h-12 min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-5 text-base text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
					/>
					<button
						type="submit"
						class="flex h-12 shrink-0 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold-soft hover:text-ink"
					>
						Subscribe <ArrowRight size={16} weight="bold" />
					</button>
				</form>
			{/if}
		</div>
	</div>

	<!-- Link columns -->
	<div class="mx-auto grid w-full max-w-7xl grid-cols-2 gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
		<div>
			<h3 class="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Shop</h3>
			<ul class="mt-4 space-y-3 text-sm">
				<li><a href="/shop" class="text-white/80 transition-colors hover:text-gold">All Fragrances</a></li>
				<li><a href="/best-sellers" class="text-white/80 transition-colors hover:text-gold">Best Sellers</a></li>
				<li><a href="/collections" class="text-white/80 transition-colors hover:text-gold">Collections</a></li>
				<li><a href="/discovery-sets" class="text-white/80 transition-colors hover:text-gold">Discovery Sets</a></li>
				<li><a href="/gift-cards" class="text-white/80 transition-colors hover:text-gold">Gift Cards</a></li>
			</ul>
		</div>
		<div>
			<h3 class="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">About</h3>
			<ul class="mt-4 space-y-3 text-sm">
				<li><a href="/about" class="text-white/80 transition-colors hover:text-gold">Our Story</a></li>
				<li><a href="/journal" class="text-white/80 transition-colors hover:text-gold">Journal</a></li>
				<li><a href="/ingredients" class="text-white/80 transition-colors hover:text-gold">Ingredients</a></li>
				<li><a href="/sustainability" class="text-white/80 transition-colors hover:text-gold">Sustainability</a></li>
			</ul>
		</div>
		<div>
			<h3 class="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Help</h3>
			<ul class="mt-4 space-y-3 text-sm">
				<li><a href="/shipping" class="text-white/80 transition-colors hover:text-gold">Shipping &amp; Delivery</a></li>
				<li><a href="/returns" class="text-white/80 transition-colors hover:text-gold">Returns &amp; Exchanges</a></li>
				<li><a href="/faq" class="text-white/80 transition-colors hover:text-gold">FAQ</a></li>
				<li><a href="/contact" class="text-white/80 transition-colors hover:text-gold">Contact Us</a></li>
			</ul>
		</div>
		<div class="col-span-2 md:col-span-1">
			<a href="/" class="flex flex-col leading-none" aria-label="Lumière Parfums home">
				<span class="font-display text-2xl font-semibold tracking-[0.28em] text-white">LUMIÈRE</span>
				<span class="mt-1 text-[9px] font-medium tracking-[0.5em] text-gold uppercase">Parfums</span>
			</a>
			<p class="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
				Fine fragrance, composed in small batches and bottled to be worn every day.
			</p>
			<div class="mt-5 flex items-center gap-2">
				<a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold">
					<InstagramLogo size={20} />
				</a>
				<a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold">
					<FacebookLogo size={20} />
				</a>
				<a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold">
					<TiktokLogo size={20} />
				</a>
				<a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold">
					<PinterestLogo size={20} />
				</a>
			</div>
		</div>
	</div>

	<!-- Bottom bar -->
	<div class="border-t border-white/10">
		<div class="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
			<p>© 2026 Lumière Parfums. All rights reserved.</p>
			<div class="flex gap-5">
				<a href="/privacy" class="transition-colors hover:text-gold">Privacy Policy</a>
				<a href="/terms" class="transition-colors hover:text-gold">Terms of Service</a>
			</div>
		</div>
	</div>
</footer>
