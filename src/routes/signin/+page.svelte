<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { ArrowRight, Eye, EyeSlash, SignIn } from 'phosphor-svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { toast } from '#lib/toast.svelte';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);

	function signIn(e: SubmitEvent) {
		e.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return toast.error('Please enter a valid email address');
		if (password.length < 6) return toast.error('Please enter your password (at least 6 characters)');
		if (browser) {
			localStorage.setItem(
				'lumiere:user',
				JSON.stringify({ email: email.trim(), name: email.trim().split('@')[0] ?? 'Friend' })
			);
		}
		toast.success('Welcome back — signed in (demo)');
		goto('/account/');
	}
</script>

<svelte:head>
	<title>Sign In — Lumière Parfums</title>
	<meta name="description" content="Sign in to your Lumière Parfums demo account." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-md text-center">
		<PageHero eyebrow="Welcome Back" title="Sign In" sub="Demo sign-in — any email and a password of 6+ characters works. Nothing is sent anywhere." align="center" />
	</div>

	<form
		onsubmit={signIn}
		class="mx-auto mt-10 max-w-md rounded-[2rem] bg-white p-6 shadow-card sm:p-8"
		novalidate
	>
		<div class="space-y-5">
			<div>
				<label for="signin-email" class="text-sm font-semibold">Email address</label>
				<input id="signin-email" type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
			</div>
			<div>
				<label for="signin-password" class="text-sm font-semibold">Password</label>
				<div class="mt-2 flex items-center rounded-full border border-line bg-cream/60 pr-2 focus-within:border-gold">
					<input
						id="signin-password"
						type={showPassword ? 'text' : 'password'}
						bind:value={password}
						autocomplete="current-password"
						placeholder="Your password"
						required
						class="h-12 min-w-0 flex-1 bg-transparent px-5 outline-none"
					/>
					<button
						type="button"
						onclick={() => (showPassword = !showPassword)}
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white"
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{#if showPassword}<EyeSlash size={19} />{:else}<Eye size={19} />{/if}
					</button>
				</div>
			</div>
		</div>
		<button type="submit" class="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold">
			<SignIn size={18} /> Sign In
		</button>
		<p class="mt-5 text-center text-sm text-ink-soft">
			No account yet? <a href="/account/" class="font-semibold text-gold underline underline-offset-2 hover:text-ink">Continue as a guest</a> — your bag and wishlist are saved on this device.
		</p>
		<a href="/shop/" class="mt-4 flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium text-ink-soft transition-colors hover:bg-cream">
			Continue shopping <ArrowRight size={16} weight="bold" />
		</a>
	</form>
</section>
