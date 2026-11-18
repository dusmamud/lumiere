<script lang="ts">
	import { ChatCircle, CheckCircle, Clock, Envelope, MapPin } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { toast } from '#lib/toast.svelte';

	let name = $state('');
	let email = $state('');
	let topic = $state('General question');
	let message = $state('');
	let sent = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim()) return toast.error('Please enter your name');
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return toast.error('Please enter a valid email address');
		if (message.trim().length < 10) return toast.error('Please tell us a little more (at least 10 characters)');
		sent = true;
		toast.success('Message sent — we reply within two business days (demo)');
	}
</script>

<svelte:head>
	<title>Contact Us — Lumière Parfums</title>
	<meta name="description" content="Contact Lumière Parfums — questions about fragrances, orders, returns and gifting. We answer within two business days." />
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
	<PageHero
		eyebrow="Contact"
		title="Talk to the House"
		sub="Questions about a scent, an order, a return or a gift? Write to us — a real person in the atelier answers within two business days."
	/>

	<div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
		<div class="space-y-6">
			<Reveal>
				<div class="rounded-[2rem] bg-white p-6 shadow-card">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold"><Envelope size={22} /></span>
					<h2 class="mt-4 font-display text-xl font-semibold">Email</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">
						<a href="mailto:hello@lumiere-parfums.example" class="font-semibold text-gold underline underline-offset-2">hello@lumiere-parfums.example</a>
					</p>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">For orders, returns and general questions.</p>
				</div>
			</Reveal>
			<Reveal delay={60}>
				<div class="rounded-[2rem] bg-white p-6 shadow-card">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold"><Clock size={22} /></span>
					<h2 class="mt-4 font-display text-xl font-semibold">Hours</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">Monday – Friday, 9am – 6pm.<br />We answer within two business days.</p>
				</div>
			</Reveal>
			<Reveal delay={120}>
				<div class="rounded-[2rem] bg-white p-6 shadow-card">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold"><MapPin size={22} /></span>
					<h2 class="mt-4 font-display text-xl font-semibold">The Atelier</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">Lumière Parfums<br />12 Rue de la Paix<br />75002 Paris, France</p>
				</div>
			</Reveal>
			<Reveal delay={180}>
				<div class="rounded-[2rem] bg-white p-6 shadow-card">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold"><ChatCircle size={22} /></span>
					<h2 class="mt-4 font-display text-xl font-semibold">Before you write</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">
						Order questions are fastest with your order number (LM-XXXXXX). Returns are covered on the
						<a href="/returns/" class="font-semibold text-gold underline underline-offset-2"> Returns page</a>,
						and most scent questions are answered in the
						<a href="/faq/" class="font-semibold text-gold underline underline-offset-2"> FAQ</a>.
					</p>
				</div>
			</Reveal>
		</div>

		<div class="lg:col-span-2">
			{#if sent}
				<div class="rounded-[2rem] bg-white p-8 text-center shadow-card sm:p-12" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-emerald-700"><CheckCircle size={32} weight="fill" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold">Thank you, {name.split(' ')[0]}.</h2>
					<p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
						Your message about “{topic}” has been received. We will reply to {email} within two business
						days. This is a demo form — no message was actually sent.
					</p>
					<button
						type="button"
						onclick={() => {
							sent = false;
							name = '';
							email = '';
							message = '';
						}}
						class="mt-6 h-12 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold"
					>
						Send another message
					</button>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-[2rem] bg-white p-6 shadow-card sm:p-8" novalidate>
					<h2 class="font-display text-2xl font-semibold">Send us a message</h2>
					<div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
						<div>
							<label for="contact-name" class="text-sm font-semibold">Your name</label>
							<input id="contact-name" type="text" bind:value={name} autocomplete="name" placeholder="Alexandra Laurent" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
						</div>
						<div>
							<label for="contact-email" class="text-sm font-semibold">Email address</label>
							<input id="contact-email" type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" required class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold" />
						</div>
					</div>
					<div class="mt-5">
						<label for="contact-topic" class="text-sm font-semibold">Topic</label>
						<select id="contact-topic" bind:value={topic} class="mt-2 h-12 w-full rounded-full border border-line bg-cream/60 px-5 outline-none focus:border-gold">
							<option>General question</option>
							<option>Order question</option>
							<option>Return or exchange</option>
							<option>Choosing a fragrance</option>
							<option>Gifting</option>
							<option>Something else</option>
						</select>
					</div>
					<div class="mt-5">
						<label for="contact-message" class="text-sm font-semibold">Message</label>
						<textarea id="contact-message" bind:value={message} rows="6" placeholder="How can we help?" required class="mt-2 w-full resize-none rounded-3xl border border-line bg-cream/60 px-5 py-3 outline-none focus:border-gold"></textarea>
					</div>
					<button type="submit" class="mt-7 flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-gold">
						Send Message
					</button>
					<p class="mt-4 text-xs leading-relaxed text-ink-soft">
						Demo form — your message is not sent anywhere. Your details are used only to show the confirmation.
					</p>
				</form>
			{/if}
		</div>
	</div>
</section>
