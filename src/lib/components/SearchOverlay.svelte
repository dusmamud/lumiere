<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { ArrowRight, MagnifyingGlass, X } from 'phosphor-svelte';
	import { searchProducts } from '#lib/api';
	import { ui } from '#lib/store.svelte';
	import { focusTrap } from '#lib/focus-trap';

	let q = $state('');
	let input: HTMLInputElement | undefined = $state();
	let lastTrigger: HTMLElement | null = null;

	let results = $derived(searchProducts(q));
	let shown = $derived(results.slice(0, 5));

	const popular = ['Rose', 'Sandalwood', 'Oud', 'Vanilla', 'Citrus'];

	$effect(() => {
		if (ui.searchOpen) {
			lastTrigger = document.activeElement as HTMLElement | null;
			document.body.style.overflow = 'hidden';
			setTimeout(() => input?.focus(), 60);
		} else {
			document.body.style.overflow = '';
			q = '';
			lastTrigger?.focus?.();
			lastTrigger = null;
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') ui.searchOpen = false;
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if ui.searchOpen}
	<div
		class="fixed inset-0 z-50 bg-ink/50 backdrop-blur-[2px]"
		transition:fade={{ duration: 180 }}
		onclick={() => (ui.searchOpen = false)}
		role="presentation"
	></div>
	<div
		class="fixed inset-x-0 top-0 z-50 bg-white shadow-2xl"
		transition:fly={{ y: -24, duration: 240, opacity: 1 }}
		role="dialog"
		aria-label="Search fragrances"
		aria-modal="true"
		use:focusTrap
	>
		<div class="mx-auto w-full max-w-3xl px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-8 sm:px-6">
			<div class="flex items-center justify-between">
				<p class="text-xs font-semibold tracking-[0.3em] text-gold uppercase">Search Lumière</p>
				<button
					type="button"
					onclick={() => (ui.searchOpen = false)}
					class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
					aria-label="Close search"
				>
					<X size={20} />
				</button>
			</div>
			<form
				method="get"
				action="/search/"
				role="search"
				class="mt-4 flex items-center gap-3 border-b-2 border-ink pb-3"
				onsubmit={() => (ui.searchOpen = false)}
			>
				<MagnifyingGlass size={24} class="shrink-0 text-ink-soft" />
				<label for="overlay-search" class="sr-only">Search fragrances</label>
				<input
					id="overlay-search"
					bind:this={input}
					bind:value={q}
					name="q"
					type="search"
					placeholder="Try “rose”, “oud”, “vanilla”…"
					autocomplete="off"
					class="h-11 min-w-0 flex-1 bg-transparent font-display text-xl outline-none placeholder:text-ink-soft/50 sm:text-2xl"
				/>
				<button
					type="submit"
					class="flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-gold"
				>
					Search <ArrowRight size={16} weight="bold" />
				</button>
			</form>

			{#if q.trim()}
				{#if shown.length}
					<ul class="mt-4 divide-y divide-line">
						{#each shown as p (p.slug)}
							<li>
								<a
									href="/product/{p.slug}/"
									onclick={() => (ui.searchOpen = false)}
									class="flex min-h-12 items-center gap-3 py-2"
								>
									<img src={p.image} alt="" class="h-12 w-12 rounded-xl object-cover" width="96" height="96" />
									<span class="min-w-0 flex-1">
										<span class="block truncate font-display text-base font-semibold">{p.name}</span>
										<span class="block truncate text-sm text-ink-soft">{p.notes}</span>
									</span>
									<span class="text-sm font-semibold">${p.price.toFixed(2)}</span>
								</a>
							</li>
						{/each}
					</ul>
					<a
						href="/search/?q={encodeURIComponent(q.trim())}"
						onclick={() => (ui.searchOpen = false)}
						class="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold hover:text-ink"
					>
						See all results for “{q.trim()}” <ArrowRight size={16} weight="bold" />
					</a>
				{:else}
					<p class="mt-4 text-sm text-ink-soft">
						No fragrances match “{q.trim()}”. Try a note like rose, oud or vanilla.
					</p>
				{/if}
			{:else}
				<p class="mt-4 text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">Popular</p>
				<div class="mt-3 flex flex-wrap gap-2">
					{#each popular as term}
						<a
							href="/search/?q={encodeURIComponent(term.toLowerCase())}"
							onclick={() => (ui.searchOpen = false)}
							class="flex h-11 items-center rounded-full border border-line bg-cream px-4 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
						>
							{term}
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
