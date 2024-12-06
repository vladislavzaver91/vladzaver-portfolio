import { useEffect, useRef, useState } from 'react';

const useVerticalHeader = () => {
	const [showVerticalHeader, setShowVerticalHeader] = useState(false);
	const headerRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				const [entry] = entries;
				setShowVerticalHeader(!entry.isIntersecting);
			},
			{ threshold: 0 },
		);

		if (headerRef.current) {
			observer.observe(headerRef.current);
		}

		return () => {
			if (headerRef.current) observer.unobserve(headerRef.current);
		};
	}, []);

	return {
		headerRef,
		showVerticalHeader,
	};
};

export default useVerticalHeader;
