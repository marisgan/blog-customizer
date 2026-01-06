import { useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(
	ref: React.RefObject<T>,
	isOpen = true,
	onOutsideClick: () => void
) {
	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) {
				onOutsideClick();
			}
		};

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [ref, isOpen, onOutsideClick]);
}
