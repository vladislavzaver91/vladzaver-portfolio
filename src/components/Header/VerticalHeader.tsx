// import Link from 'next/link';
// import { NAV_ITEMS } from './nav-items.data';

// const VerticalHeader = () => {
// 	return (
// 		<div className="container">
// 			<header className="fixed h-full w-1 shadow-lg">
// 				<nav className="flex flex-col items-center mt-14 w-[70px]">
// 					{NAV_ITEMS.map((item, index) => (
// 						<Link key={index} href={item.link} className="vertical-link link-hover py-10 text-primeColor">
// 							<span className="first-letter">{item.name.charAt(0)}</span>
// 							<span className="text">{item.name}</span>
// 						</Link>
// 					))}
// 				</nav>
// 			</header>
// 		</div>
// 	);
// };

// export default VerticalHeader;

import Link from 'next/link';
import { NAV_ITEMS } from './nav-items.data';

const VerticalHeader = () => {
	return (
		<div className="container">
			<header className="fixed h-full w-1 shadow-lg">
				<nav className="flex flex-col-reverse items-center mt-14 w-[70px]">
					{NAV_ITEMS.map((item, index) => (
						<Link key={index} href={item.link} className="vertical-link link-hover py-10 text-primeColor">
							<span className="text">{item.name}</span>
						</Link>
					))}
				</nav>
			</header>
		</div>
	);
};

export default VerticalHeader;
