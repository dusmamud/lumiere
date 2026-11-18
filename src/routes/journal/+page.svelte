<script lang="ts">
	import { ArrowRight } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { journalArticles } from '#lib/data/journal';
</script>

<svelte:head>
	<title>Journal — Lumière Parfums</title>
	<meta name="description" content="Notes from the Lumière atelier — how a scent is born, the ingredients that matter, and how to find your signature fragrance." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Journal"
		title="Notes on Craft"
		sub="What happens inside the atelier, why the ingredients matter, and how to find the scent that feels like you."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each journalArticles as article, i}
			<Reveal delay={i * 80}>
				<article class="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-card transition-shadow hover:shadow-lift">
					<a href="/journal/{article.slug}/" class="block overflow-hidden">
						<img
							src={article.image}
							alt={article.imageAlt}
							loading="lazy"
							width="800"
							height="600"
							class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
						/>
					</a>
					<div class="flex flex-1 flex-col p-6 sm:p-7">
						<p class="text-[11px] font-semibold tracking-[0.25em] text-gold uppercase">
							{article.date} · {article.readMinutes} min read
						</p>
						<a href="/journal/{article.slug}/" class="mt-3 block font-display text-2xl leading-snug font-semibold hover:text-gold">
							{article.title}
						</a>
						<p class="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
						<a href="/journal/{article.slug}/" class="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold tracking-[0.1em] text-ink uppercase transition-colors hover:text-gold">
							Read the Article <ArrowRight size={16} weight="bold" />
						</a>
					</div>
				</article>
			</Reveal>
		{/each}
	</div>
</section>
