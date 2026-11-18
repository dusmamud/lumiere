<script lang="ts">
	let {
		eyebrow,
		title,
		sub = '',
		align = 'left'
	}: {
		eyebrow: string;
		title: string;
		sub?: string;
		align?: 'left' | 'center';
	} = $props();
</script>

<div class={align === 'center' ? 'text-center' : ''}>
	<p class="text-xs font-semibold tracking-[0.3em] text-gold uppercase">{eyebrow}</p>
	<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">{title}</h1>
	{#if sub}
		<p class="mt-4 max-w-2xl leading-relaxed text-ink-soft {align === 'center' ? 'mx-auto' : ''}">{sub}</p>
	{/if}
</div>
