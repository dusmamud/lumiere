<script lang="ts">
	import '@fontsource/playfair-display/400.css';
	import '@fontsource/playfair-display/400-italic.css';
	import '@fontsource/playfair-display/500.css';
	import '@fontsource/playfair-display/500-italic.css';
	import '@fontsource/playfair-display/600.css';
	import '@fontsource/playfair-display/600-italic.css';
	import '@fontsource/playfair-display/700.css';
	import '@fontsource/playfair-display/700-italic.css';
	import '@fontsource/jost/300.css';
	import '@fontsource/jost/400.css';
	import '@fontsource/jost/500.css';
	import '@fontsource/jost/600.css';
	import '#lib/app.css';
	import favicon from '#lib/assets/favicon.svg';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import SearchOverlay from '#lib/components/SearchOverlay.svelte';
	import Toast from '#lib/components/Toast.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lumière Parfums — Fine Fragrance</title>
	<meta name="description" content="Lumière Parfums — fine fragrance composed in small batches. Free shipping on orders over $75, complimentary samples with every order." />
	<meta name="theme-color" content="#1a1714" />
</svelte:head>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
>
	Skip to content
</a>
<div class="flex min-h-dvh flex-col overflow-x-clip bg-cream">
	<Header />
	<main id="main-content" class="w-full flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

<CartDrawer />
<SearchOverlay />
<Toast />
