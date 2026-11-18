<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page Not Found — Lumière Parfums</title>
</svelte:head>

<section class="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-28 text-center sm:px-6 lg:px-8">
	<p class="text-xs font-medium tracking-[0.35em] text-gold uppercase">404</p>
	<h1 class="mt-4 font-display text-5xl font-semibold sm:text-6xl">This page has drifted away</h1>
	<p class="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
		The page you were looking for{#if page.status === 404} ({page.url.pathname}){/if} no longer exists, or was never here.
		Let us guide you back to the collection.
	</p>
	<a
		href="/"
		class="mt-8 flex h-12 items-center rounded-full bg-ink px-8 text-sm font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold"
	>
		Return Home
	</a>
</section>
