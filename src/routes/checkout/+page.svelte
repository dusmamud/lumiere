<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { ArrowLeft, ArrowRight, Check, CheckCircle, CreditCard, Lock, MapPin, Package, User } from 'phosphor-svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { cart } from '#lib/store.svelte';
	import { toast } from '#lib/toast.svelte';
	import { FREE_SHIPPING_AT, getProduct, priceForSize } from '#lib/data/products';

	type Step = 1 | 2 | 3;
	let step = $state<Step>(1);
	let orderNo = $state('');

	// Step 1 — details
	let fullName = $state('');
	let email = $state('');
	// Step 2 — shipping
	let address = $state('');
	let city = $state('');
	let postcode = $state('');
	let country = $state('United States');
	let method = $state<'standard' | 'express'>('standard');
	// Step 3 — payment (demo only)
	let cardName = $state('');
	let cardNumber = $state('');
	let cardExpiry = $state('');
	let cardCvc = $state('');

	const shippingCost = $derived(cart.shippingFree ? 0 : method === 'express' ? 14.95 : 6.95);
	const total = $derived(cart.subtotal + shippingCost);
	const validEmail = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));

	function formatCard(value: string): string {
		return value
			.replace(/\D/g, '')
			.slice(0, 16)
			.replace(/(\d{4})(?=\d)/g, '$1 ');
	}

	function formatExpiry(value: string): string {
		const digits = value.replace(/\D/g, '').slice(0, 4);
		return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
	}

	function nextFromDetails(e: SubmitEvent) {
		e.preventDefault();
		if (!fullName.trim()) return toast.error('Please enter your full name');
		if (!validEmail) return toast.error('Please enter a valid email address');
		step = 2;
	}

	function nextFromShipping(e: SubmitEvent) {
		e.preventDefault();
		if (!address.trim() || !city.trim() || !postcode.trim())
			return toast.error('Please complete your shipping address');
		step = 3;
	}

	function placeOrder(e: SubmitEvent) {
		e.preventDefault();
		// Normalise first: the formatted inputs use bind:value + oninput, and Svelte's
		// binding can overwrite the formatter's value with the raw DOM value
		// (e.g. expiry stays "0828" instead of "08/28") for both typed and
		// programmatic input — so validate the normalised values, not the raw state.
		const expiry = formatExpiry(cardExpiry);
		const digits = cardNumber.replace(/\s/g, '');
		if (digits.length < 15) return toast.error('Please enter a card number');
		if (!/^\d{2}\/\d{2}$/.test(expiry)) return toast.error('Please enter the expiry as MM/YY');
		if (cardCvc.replace(/\D/g, '').length < 3) return toast.error('Please enter the 3-digit security code');
		const n = `LM-${Math.floor(100000 + Math.random() * 900000)}`;
		orderNo = n;
		if (browser) {
			try {
				const prev = JSON.parse(localStorage.getItem('lumiere:orders') ?? '[]') as unknown[];
				localStorage.setItem(
					'lumiere:orders',
					JSON.stringify([
						{
							no: n,
							date: new Date().toISOString().slice(0, 10),
							total: total.toFixed(2),
							items: cart.count,
							name: fullName.trim()
						},
						...prev
					])
				);
			} catch {
				/* demo storage is best-effort */
			}
		}
		cart.clear();
		toast.success(`Order ${n} placed — thank you`);
	}

	const steps: { n: Step; label: string; Icon: typeof User }[] = [
		{ n: 1, label: 'Your Details', Icon: User },
		{ n: 2, label: 'Shipping', Icon: MapPin },
		{ n: 3, label: 'Payment', Icon: CreditCard }
	];
</script>

<svelte:head>
	<title>Checkout — Lumière Parfums</title>
	<meta name="description" content="Demo checkout for Lumière Parfums — no real charge is made." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	{#if orderNo}
		<div class="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-card sm:p-12">
			<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream text-emerald-700">
				<CheckCircle size={40} weight="fill" />
			</span>
			<p class="mt-6 text-xs font-semibold tracking-[0.3em] text-gold uppercase">Demo Order Confirmed</p>
			<h1 class="mt-3 font-display text-4xl font-semibold">Thank you, {fullName.split(' ')[0] ?? 'friend'}.</h1>
			<p class="mt-4 leading-relaxed text-ink-soft">
				Your demo order <strong class="text-ink">{orderNo}</strong> is confirmed. No card was charged — this
				checkout is a demonstration only. A confirmation would normally arrive at
				<strong class="text-ink"> {email}</strong>.
			</p>
			<p class="mt-3 text-sm text-ink-soft">
				You can look this order up any time on the
				<a href="/track/" class="font-semibold text-gold underline underline-offset-2">Track Order</a> page.
			</p>
			<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
				<a href="/shop/" class="flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
					Continue Shopping <ArrowRight size={16} weight="bold" />
				</a>
				<a href="/account/" class="flex h-12 items-center justify-center rounded-full border border-line px-7 text-sm font-semibold transition-colors hover:border-gold hover:text-gold">
					View My Account
				</a>
			</div>
		</div>
	{:else}
		<PageHero
			eyebrow="Checkout"
			title="Checkout"
			sub="Demo checkout — no real payment is taken and no card is charged."
		/>

		{#if cart.lines.length === 0}
			<div class="mt-10 rounded-[2rem] bg-white p-10 text-center shadow-card">
				<p class="font-display text-2xl font-semibold">Your bag is empty</p>
				<p class="mt-2 text-sm text-ink-soft">Add a fragrance before checking out.</p>
				<a href="/shop/" class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
					Shop fragrances <ArrowRight size={16} weight="bold" />
				</a>
			</div>
		{:else}
			<!-- Stepper -->
			<ol class="mt-10 flex flex-wrap items-center gap-2" aria-label="Checkout steps">
				{#each steps as s}
					<li class="flex items-center gap-2">
						<span
							class="flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold {step === s.n
								? 'bg-ink text-white'
								: step > s.n
									? 'bg-gold text-white'
									: 'bg-white text-ink-soft shadow-card'}"
							aria-current={step === s.n ? 'step' : undefined}
						>
							{#if step > s.n}<Check size={16} weight="bold" />{:else}<s.Icon size={17} />{/if}
							<span class="hidden sm:inline">{s.label}</span>
						</span>
						{#if s.n < 3}<span class="h-px w-6 bg-line sm:w-10" aria-hidden="true"></span>{/if}
					</li>
				{/each}
			</ol>

			<div class="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
				<div class="lg:col-span-2">
					{#if step === 1}
						<form onsubmit={nextFromDetails} class="rounded-[2rem] bg-white p-6 shadow-card sm:p-8" novalidate>
							<h2 class="font-display text-2xl font-semibold">Your Details</h2>
							<div class="mt-6 space-y-5">
								<div>
									<label for="co-name" class="text-sm font-semibold">Full name</label>
									<input id="co-name" type="text" bind:value={fullName} autocomplete="name" placeholder="Alexandra Laurent" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
								</div>
								<div>
									<label for="co-email" class="text-sm font-semibold">Email address</label>
									<input id="co-email" type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
									<p class="mt-2 text-xs text-ink-soft">Your demo order confirmation is addressed here.</p>
								</div>
							</div>
							<button type="submit" class="mt-8 flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
								Continue to Shipping <ArrowRight size={16} weight="bold" />
							</button>
						</form>
					{:else if step === 2}
						<form onsubmit={nextFromShipping} class="rounded-[2rem] bg-white p-6 shadow-card sm:p-8" novalidate>
							<h2 class="font-display text-2xl font-semibold">Shipping</h2>
							<div class="mt-6 space-y-5">
								<div>
									<label for="co-address" class="text-sm font-semibold">Street address</label>
									<input id="co-address" type="text" bind:value={address} autocomplete="street-address" placeholder="12 Rue de la Paix" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
								</div>
								<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
									<div>
										<label for="co-city" class="text-sm font-semibold">City</label>
										<input id="co-city" type="text" bind:value={city} autocomplete="address-level2" placeholder="Paris" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
									</div>
									<div>
										<label for="co-postcode" class="text-sm font-semibold">Postcode</label>
										<input id="co-postcode" type="text" bind:value={postcode} autocomplete="postal-code" placeholder="75002" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
									</div>
								</div>
								<div>
									<label for="co-country" class="text-sm font-semibold">Country</label>
									<select id="co-country" bind:value={country} class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold">
										<option>United States</option>
										<option>United Kingdom</option>
										<option>France</option>
										<option>Germany</option>
										<option>Canada</option>
										<option>Australia</option>
										<option>India</option>
									</select>
								</div>
								<fieldset>
									<legend class="text-sm font-semibold">Delivery method</legend>
									<div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
										<button type="button" onclick={() => (method = 'standard')} aria-pressed={method === 'standard'} class="flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-5 py-3 text-left text-sm transition-colors {method === 'standard' ? 'border-ink bg-cream' : 'border-line bg-white hover:border-gold'}">
											<span><strong>Standard</strong><br /><span class="text-ink-soft">3–5 business days</span></span>
											<span class="font-semibold">{cart.shippingFree ? 'Free' : '$6.95'}</span>
										</button>
										<button type="button" onclick={() => (method = 'express')} aria-pressed={method === 'express'} class="flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-5 py-3 text-left text-sm transition-colors {method === 'express' ? 'border-ink bg-cream' : 'border-line bg-white hover:border-gold'}">
											<span><strong>Express</strong><br /><span class="text-ink-soft">1–2 business days</span></span>
											<span class="font-semibold">$14.95</span>
										</button>
									</div>
								</fieldset>
							</div>
							<div class="mt-8 flex flex-wrap gap-3">
								<button type="button" onclick={() => (step = 1)} class="flex h-12 items-center gap-2 rounded-full border border-line px-6 text-sm font-semibold transition-colors hover:border-gold hover:text-gold">
									<ArrowLeft size={16} weight="bold" /> Back
								</button>
								<button type="submit" class="flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
									Continue to Payment <ArrowRight size={16} weight="bold" />
								</button>
							</div>
						</form>
					{:else}
						<form onsubmit={placeOrder} class="rounded-[2rem] bg-white p-6 shadow-card sm:p-8" novalidate>
							<h2 class="font-display text-2xl font-semibold">Payment</h2>
							<p class="mt-2 flex items-center gap-2 text-sm text-ink-soft">
								<Lock size={16} class="text-gold" /> Demo only — no card is charged. Use any test details.
							</p>
							<div class="mt-6 space-y-5">
								<div>
									<label for="co-cardname" class="text-sm font-semibold">Name on card</label>
									<input id="co-cardname" type="text" bind:value={cardName} autocomplete="cc-name" placeholder="Alexandra Laurent" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
								</div>
								<div>
									<label for="co-cardnum" class="text-sm font-semibold">Card number</label>
									<input id="co-cardnum" type="text" inputmode="numeric" bind:value={cardNumber} oninput={(e) => (cardNumber = formatCard((e.target as HTMLInputElement).value))} autocomplete="cc-number" placeholder="4242 4242 4242 4242" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
								</div>
								<div class="grid grid-cols-2 gap-5">
									<div>
										<label for="co-exp" class="text-sm font-semibold">Expiry (MM/YY)</label>
										<input id="co-exp" type="text" inputmode="numeric" bind:value={cardExpiry} oninput={(e) => (cardExpiry = formatExpiry((e.target as HTMLInputElement).value))} autocomplete="cc-exp" placeholder="08/28" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
									</div>
									<div>
										<label for="co-cvc" class="text-sm font-semibold">Security code</label>
										<input id="co-cvc" type="text" inputmode="numeric" bind:value={cardCvc} oninput={(e) => (cardCvc = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4))} autocomplete="cc-csc" placeholder="123" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
									</div>
								</div>
							</div>
							<div class="mt-8 flex flex-wrap gap-3">
								<button type="button" onclick={() => (step = 2)} class="flex h-12 items-center gap-2 rounded-full border border-line px-6 text-sm font-semibold transition-colors hover:border-gold hover:text-gold">
									<ArrowLeft size={16} weight="bold" /> Back
								</button>
								<button type="submit" class="flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
									<Lock size={16} /> Place Demo Order — ${total.toFixed(2)}
								</button>
							</div>
						</form>
					{/if}
				</div>

				<!-- Summary -->
				<aside class="h-fit rounded-[2rem] bg-white p-6 shadow-card lg:sticky lg:top-32">
					<h2 class="flex items-center gap-2 font-display text-2xl font-semibold"><Package size={22} /> Your Order</h2>
					<ul class="mt-5 space-y-4">
						{#each cart.lines as line (line.slug + line.size)}
							{@const p = getProduct(line.slug)}
							{#if p}
								<li class="flex items-center gap-3">
									<img src={p.image} alt="" class="h-14 w-14 rounded-xl object-cover" width="112" height="112" />
									<span class="min-w-0 flex-1">
										<span class="block truncate text-sm font-semibold">{p.name}</span>
										<span class="block text-xs text-ink-soft">{line.size} × {line.qty}</span>
									</span>
									<span class="text-sm font-semibold">${(priceForSize(p, line.size) * line.qty).toFixed(2)}</span>
								</li>
							{/if}
						{/each}
					</ul>
					<dl class="mt-5 space-y-2 border-t border-line pt-4 text-sm">
						<div class="flex justify-between"><dt class="text-ink-soft">Subtotal</dt><dd class="font-semibold">${cart.subtotal.toFixed(2)}</dd></div>
						<div class="flex justify-between"><dt class="text-ink-soft">Shipping</dt><dd class="font-semibold">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</dd></div>
						<div class="flex justify-between border-t border-line pt-3 text-base"><dt class="font-semibold">Total</dt><dd class="font-bold">${total.toFixed(2)}</dd></div>
					</dl>
					{#if !cart.shippingFree}
						<p class="mt-3 text-xs leading-relaxed text-ink-soft">
							Free shipping on orders over ${FREE_SHIPPING_AT.toFixed(0)} — add ${(FREE_SHIPPING_AT - cart.subtotal).toFixed(2)} more.
						</p>
					{/if}
					<button type="button" onclick={() => goto('/cart/')} class="mt-5 h-11 w-full rounded-full text-sm font-medium text-ink-soft transition-colors hover:bg-cream">
						Edit bag
					</button>
				</aside>
			</div>
		{/if}
	{/if}
</section>
