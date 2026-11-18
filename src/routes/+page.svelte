<script lang="ts">
	import { ArrowRight, Drop, Flask, Flower, FlowerLotus, Gift, Heart, Lock, MagnifyingGlass, Package, Sparkle, SprayBottle, Truck, ArrowsCounterClockwise } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { featuredProducts, products } from '#lib/data/products';
	import { journalArticles } from '#lib/data/journal';

	const categories = [
		{ href: '/collections/womens/', label: "WOMEN'S PERFUMES", Icon: Flower },
		{ href: '/collections/mens/', label: "MEN'S PERFUMES", Icon: SprayBottle },
		{ href: '/collections/unisex/', label: 'UNISEX FRAGRANCES', Icon: Flask },
		{ href: '/collections/gift-sets/', label: 'GIFT SETS & COLLECTIONS', Icon: Gift },
		{ href: '/collections/oils-rollers/', label: 'PERFUME OILS & ROLLERS', Icon: Drop },
		{ href: '/collections/discovery-sets/', label: 'DISCOVERY SETS', Icon: Sparkle }
	];

	const heroQualities = [
		{ label: 'FINEST INGREDIENTS', Icon: FlowerLotus },
		{ label: 'LONG LASTING SCENTS', Icon: SprayBottle },
		{ label: 'ELEGANT PACKAGING', Icon: Gift },
		{ label: 'MADE WITH PASSION', Icon: Heart }
	];

	const trustItems = [
		{ title: 'FREE SHIPPING', sub: 'On orders over $75', Icon: Truck },
		{ title: 'COMPLIMENTARY SAMPLES', sub: 'With every order', Icon: Sparkle },
		{ title: 'EASY RETURNS', sub: '30-day return policy', Icon: ArrowsCounterClockwise },
		{ title: 'SECURE PAYMENTS', sub: 'Safe & encrypted', Icon: Lock }
	];

	const bestSellers = products.filter((p) => p.badge === 'Best Seller');
	const journalTeaser = journalArticles.slice(0, 2);
</script>

<svelte:head>
	<title>Lumière Parfums — Fine Fragrance</title>
	<meta
		name="description"
		content="Lumière Parfums — luxury fragrances, thoughtfully crafted with the finest ingredients from around the world. Free shipping on orders over $75."
	/>
</svelte:head>

<!-- ============ HERO (reference) ============ -->
<section class="bg-beige">
	<div class="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-10 pb-24 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pt-14 lg:pb-32">
		<!-- Copy -->
		<div class="flex flex-col items-start justify-center lg:col-span-4">
			<p
				class="hero-enter text-[11px] font-semibold tracking-[0.35em] text-ink-soft uppercase"
				style="--hero-delay: 0ms"
			>
				Crafted for Moments
			</p>
			<h1
				class="hero-enter mt-5 font-display text-[44px] leading-[1.08] font-medium text-ink sm:text-6xl lg:text-[56px]"
				style="--hero-delay: 80ms"
			>
				Scents that leave a <em class="font-display italic">lasting impression.</em>
			</h1>
			<p
				class="hero-enter mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg"
				style="--hero-delay: 160ms"
			>
				Luxury fragrances, thoughtfully crafted with the finest ingredients from around the world.
			</p>
			<a
				href="/collections/"
				class="hero-enter mt-8 flex h-12 items-center gap-2 rounded-lg bg-ink px-7 text-[13px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-gold"
				style="--hero-delay: 240ms"
			>
				Explore Collections <ArrowRight size={16} weight="bold" />
			</a>
		</div>

		<!-- Hero image — the LCP image, never lazy -->
		<div class="hero-enter lg:col-span-6" style="--hero-delay: 120ms">
			<img
				src="/images/hero-eclat-noir.webp"
				alt="Éclat Noir — Lumière Parfums eau de parfum on a marble slab with white flowers"
				width="1200"
				height="900"
				fetchpriority="high"
				class="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
			/>
		</div>

		<!-- Right-edge qualities -->
		<div class="hero-enter flex flex-row flex-wrap gap-x-8 gap-y-6 lg:col-span-2 lg:flex-col lg:items-end lg:justify-center lg:gap-10 lg:py-4" style="--hero-delay: 320ms">
			{#each heroQualities as q}
				<div class="flex flex-col items-start gap-2 lg:items-end lg:text-right">
					<q.Icon size={26} weight="thin" class="text-ink" />
					<span class="max-w-28 text-[11px] leading-snug font-medium tracking-[0.14em] text-ink uppercase">{q.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============ CATEGORY STRIP (overlaps hero) ============ -->
<section class="mx-auto -mt-14 w-full max-w-7xl px-4 sm:px-6 lg:-mt-16 lg:px-8">
	<Reveal>
		<nav
			class="grid grid-cols-2 gap-y-6 rounded-[2rem] bg-white px-4 py-7 shadow-card sm:grid-cols-3 lg:grid-cols-6 lg:px-8"
			aria-label="Shop by category"
		>
			{#each categories as c}
				<a
					href={c.href}
					class="group flex min-h-11 flex-col items-center gap-3 px-2 text-center transition-colors"
				>
					<c.Icon size={30} weight="thin" class="text-ink transition-colors group-hover:text-gold" />
					<span class="max-w-32 text-[11px] leading-snug font-semibold tracking-[0.12em] text-ink uppercase group-hover:text-gold">
						{c.label}
					</span>
				</a>
			{/each}
		</nav>
	</Reveal>
</section>

<!-- ============ FEATURED FRAGRANCES (reference) ============ -->
<section class="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
	<Reveal>
		<div class="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
			<h2 class="font-display text-3xl font-semibold tracking-wide text-ink sm:text-4xl">FEATURED FRAGRANCES</h2>
			<a
				href="/shop/"
				class="flex min-h-11 shrink-0 items-center gap-1.5 text-[13px] font-semibold tracking-[0.1em] text-ink uppercase transition-colors hover:text-gold"
			>
				View All Fragrances <ArrowRight size={16} weight="bold" />
			</a>
		</div>
	</Reveal>
	<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-5">
		{#each featuredProducts as product, i}
			<Reveal delay={i * 60}>
				<ProductCard {product} />
			</Reveal>
		{/each}
	</div>
</section>

<!-- ============ PROMO BANNERS (reference) ============ -->
<section class="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pt-14 sm:px-6 lg:grid-cols-2 lg:px-8">
	<Reveal>
		<article class="relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-9">
			<img
				src="/images/discovery-set.webp"
				alt="Lumière discovery set — five small vials in a black gift box"
				loading="lazy"
				width="800"
				height="600"
				class="absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-90"
			/>
			<div class="relative max-w-[55%]">
				<p class="text-[11px] font-semibold tracking-[0.3em] text-gold-soft uppercase">Discovery Sets</p>
				<h3 class="mt-3 font-display text-3xl leading-tight font-semibold sm:text-4xl">Find your signature scent.</h3>
				<p class="mt-3 text-sm leading-relaxed text-white/75">
					Explore our curated sets and find the fragrance that&rsquo;s uniquely yours.
				</p>
			</div>
			<a
				href="/discovery-sets/"
				class="relative mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-gold hover:text-white"
			>
				Shop Discovery Sets <ArrowRight size={16} weight="bold" />
			</a>
		</article>
	</Reveal>
	<Reveal delay={100}>
		<article class="relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-[2rem] bg-beige p-7 text-ink sm:p-9">
			<img
				src="/images/gift-box.webp"
				alt="Lumière gift box with a black ribbon beside a bottle of Éclat Noir"
				loading="lazy"
				width="800"
				height="600"
				class="absolute inset-y-0 right-0 h-full w-1/2 object-cover"
			/>
			<div class="relative max-w-[55%]">
				<p class="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">The Art of Gifting</p>
				<h3 class="mt-3 font-display text-3xl leading-tight font-semibold sm:text-4xl">Gifts that speak elegance.</h3>
				<p class="mt-3 text-sm leading-relaxed text-ink-soft">
					Beautifully wrapped, thoughtfully chosen. The perfect gift for every occasion.
				</p>
			</div>
			<a
				href="/collections/gift-sets/"
				class="relative mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-ink px-6 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold"
			>
				Shop Gift Sets <ArrowRight size={16} weight="bold" />
			</a>
		</article>
	</Reveal>
</section>

<!-- ============ TRUST BAR (reference) ============ -->
<section class="mx-auto w-full max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
	<Reveal>
		<div class="grid grid-cols-1 gap-x-4 gap-y-8 border-y border-line py-8 min-[420px]:grid-cols-2 lg:grid-cols-4">
			{#each trustItems as t}
				<div class="flex items-center gap-4">
					<t.Icon size={30} weight="thin" class="shrink-0 text-ink" />
					<div>
						<p class="text-[12px] font-semibold tracking-[0.12em] text-ink uppercase">{t.title}</p>
						<p class="mt-1 text-[13px] text-ink-soft">{t.sub}</p>
					</div>
				</div>
			{/each}
		</div>
	</Reveal>
</section>

<!-- ============ BEST SELLERS (below the fold) ============ -->
<section class="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
	<Reveal>
		<div class="flex items-end justify-between gap-4">
			<div>
				<p class="text-xs font-semibold tracking-[0.3em] text-gold uppercase">Most Loved</p>
				<h2 class="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Best Sellers</h2>
			</div>
			<a
				href="/best-sellers/"
				class="flex min-h-11 shrink-0 items-center gap-1.5 text-[13px] font-semibold tracking-[0.1em] text-ink uppercase transition-colors hover:text-gold"
			>
				All Best Sellers <ArrowRight size={16} weight="bold" />
			</a>
		</div>
	</Reveal>
	<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
		{#each bestSellers as product, i}
			<Reveal delay={i * 60}>
				<ProductCard {product} />
			</Reveal>
		{/each}
	</div>
</section>

<!-- ============ JOURNAL TEASER ============ -->
<section class="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
	<Reveal>
		<div class="flex items-end justify-between gap-4">
			<div>
				<p class="text-xs font-semibold tracking-[0.3em] text-gold uppercase">From the Journal</p>
				<h2 class="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Notes on Craft</h2>
			</div>
			<a
				href="/journal/"
				class="flex min-h-11 shrink-0 items-center gap-1.5 text-[13px] font-semibold tracking-[0.1em] text-ink uppercase transition-colors hover:text-gold"
			>
				All Articles <ArrowRight size={16} weight="bold" />
			</a>
		</div>
	</Reveal>
	<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each journalTeaser as article, i}
			<Reveal delay={i * 80}>
				<article class="group h-full overflow-hidden rounded-[2rem] bg-white shadow-card transition-shadow hover:shadow-lift">
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
					<div class="p-6 sm:p-7">
						<p class="text-[11px] font-semibold tracking-[0.25em] text-gold uppercase">
							{article.date} · {article.readMinutes} min read
						</p>
						<a href="/journal/{article.slug}/" class="mt-3 block font-display text-2xl leading-snug font-semibold hover:text-gold">
							{article.title}
						</a>
						<p class="mt-3 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
						<a
							href="/journal/{article.slug}/"
							class="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold tracking-[0.1em] text-ink uppercase transition-colors hover:text-gold"
						>
							Read the Article <ArrowRight size={16} weight="bold" />
						</a>
					</div>
				</article>
			</Reveal>
		{/each}
	</div>
</section>

<!-- ============ ABOUT / INGREDIENTS STRIP ============ -->
<section class="mx-auto w-full max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
	<Reveal>
		<div class="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-2">
			<img
				src="/images/journal-ingredients.webp"
				alt="Raw fragrance ingredients — rose petals, vanilla pods, woods and resins"
				loading="lazy"
				width="800"
				height="600"
				class="aspect-[4/3] h-full w-full object-cover lg:aspect-auto"
			/>
			<div class="p-7 sm:p-10">
				<p class="text-xs font-semibold tracking-[0.3em] text-gold uppercase">Our Craft</p>
				<h2 class="mt-3 font-display text-3xl leading-tight font-semibold sm:text-4xl">
					Composed in small batches, from ingredients we choose ourselves.
				</h2>
				<p class="mt-4 leading-relaxed text-ink-soft">
					Damask rose picked before sunrise. Sandalwood aged before it is distilled. Vanilla that is dark
					and resinous, never sugary. A Lumière fragrance is only as good as its raw materials — so we
					spend more time choosing them than on almost anything else.
				</p>
				<div class="mt-6 flex flex-wrap gap-3">
					<a
						href="/about/"
						class="flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-gold"
					>
						Our Story <ArrowRight size={16} weight="bold" />
					</a>
					<a
						href="/ingredients/"
						class="flex h-12 items-center gap-2 rounded-full border border-line px-6 text-[13px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
					>
						Ingredients <MagnifyingGlass size={16} />
					</a>
					<a
						href="/journal/inside-the-atelier/"
						class="flex h-12 items-center gap-2 rounded-full border border-line px-6 text-[13px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
					>
						<Package size={16} /> Inside the Atelier
					</a>
				</div>
			</div>
		</div>
	</Reveal>
</section>
