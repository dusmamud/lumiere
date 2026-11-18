/**
 * Focus trap action for modal surfaces (cart drawer, mobile menu).
 * Keeps Tab cycling inside the element; restores nothing on destroy —
 * callers handle focus return.
 */
export function focusTrap(node: HTMLElement) {
	function onKeydown(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;
		const focusable = [...node.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
		)].filter((el) => el.offsetParent !== null);
		if (!focusable.length) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	node.addEventListener('keydown', onKeydown);
	const first = node.querySelector<HTMLElement>(
		'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
	);
	first?.focus();
	return {
		destroy() {
			node.removeEventListener('keydown', onKeydown);
		}
	};
}
