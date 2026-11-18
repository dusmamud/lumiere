<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import { ArrowLeft, ArrowRight } from 'phosphor-svelte';
	import { getArticle, journalArticles } from '#lib/data/journal';

	const slug = page.params.slug ?? '';
	const article = getArticle(slug);
	if (!article) throw error(404, 'Article not found');

	const others = journalArticles.filter((a) => a.slug !== slug).slice(0, 2);
</script>

<svelte:head>
	<title>{article.title} — Lumière Parfums Journal</title>
	<meta name="description" content={article.excerpt} />
</svelte:head>

<article class="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<nav aria-label="Breadcrumb" class="text-sm text-ink-soft">
		<a href="/" class="hover:text-gold">Home</a> <span aria-hidden="true">/</span>
		<a href="/journal/" class="hover:text-gold">Journal</a> <span aria-hidden="true">/</span>
		<span class="text-ink">{article.title}</span>
	</nav>

	<p class="mt-8 text-xs font-semibold tracking-[0.3em] text-gold uppercase">
		Journal · {article.date} · {article.readMinutes} min read
	</p>
	<h1 class="mt-3 font-display text-4xl leading-tight font-semibold sm:text-5xl">{article.title}</h1>
	<p class="mt-4 text-lg leading-relaxed text-ink-soft">{article.excerpt}</p>

	<img
		src={article.image}
		alt={article.imageAlt}
		width="1000"
		height="750"
		fetchpriority="high"
		class="mt-8 aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card"
	/>

	<div class="mt-8 space-y-5">
		{#each article.body as paragraph}
			<p class="leading-relaxed text-ink-soft">{paragraph}</p>
		{/each}
	</div>

	<a href="/journal/" class="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold hover:text-ink">
		<ArrowLeft size={16} weight="bold" /> Back to the Journal
	</a>

	{#if others.length}
		<aside class="mt-12 border-t border-line pt-10">
			<h2 class="font-display text-2xl font-semibold">Keep Reading</h2>
			<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
				{#each others as o}
					<a href="/journal/{o.slug}/" class="group overflow-hidden rounded-[2rem] bg-white shadow-card transition-shadow hover:shadow-lift">
						<img src={o.image} alt={o.imageAlt} loading="lazy" width="800" height="600" class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
						<span class="block p-5">
							<span class="block font-display text-xl leading-snug font-semibold group-hover:text-gold">{o.title}</span>
							<span class="mt-2 flex min-h-11 items-center gap-1.5 text-[13px] font-semibold tracking-[0.1em] text-ink uppercase">Read <ArrowRight size={15} weight="bold" /></span>
						</span>
					</a>
				{/each}
			</div>
		</aside>
	{/if}
</article>
