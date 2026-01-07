import { useEffect } from 'react';

export const useCloseOnOutsideClickOrEsc = (
	isOpen: boolean,
	onClose: () => void,
	ref: React.RefObject<HTMLElement>
) => {
	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) onClose();
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) onClose();
		};
		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose, ref]);
};
