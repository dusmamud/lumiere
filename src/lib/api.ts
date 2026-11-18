import { getCollections, getProduct, products, type Category, type Product } from './data/products';

/**
 * API seam for the Lumière Parfums storefront.
 *
 * Client-side only for now: the catalogue lives in `data/products.ts`.
 * When the Go backend lands, set `VITE_API_BASE` (e.g. https://api.lumiere.example)
 * and these functions will fetch from the real REST API instead — no page
 * code needs to change, because every page talks to this module only.
 */
const API_BASE = import.meta.env.VITE_API_BASE as string | undefined;

async function fetchJson<T>(path: string): Promise<T> {
	const res = await fetch(`${API_BASE}${path}`);
	if (!res.ok) throw new Error(`API ${res.status} on ${path}`);
	return res.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
	if (API_BASE) return fetchJson<Product[]>('/products');
	return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
	if (API_BASE) {
		try {
			return await fetchJson<Product>(`/products/${slug}`);
		} catch {
			return undefined;
		}
	}
	return getProduct(slug);
}

export async function getCollectionsList(): Promise<string[]> {
	if (API_BASE) {
		try {
			return await fetchJson<string[]>('/collections');
		} catch {
			return getCollections();
		}
	}
	return getCollections();
}

export function searchProducts(query: string): Product[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return products.filter(
		(p) =>
			p.name.toLowerCase().includes(q) ||
			p.notes.toLowerCase().includes(q) ||
			p.category.toLowerCase().includes(q) ||
			p.collection.toLowerCase().includes(q)
	);
}

export type { Category, Product };
