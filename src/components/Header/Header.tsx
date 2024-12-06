'use client'
import useVerticalHeader from '@/hooks/useVerticalHeader'
import { Link } from '@/i18n/routing'
import LanguageSwitcher from './LanguageSwitcher'
import { NAV_ITEMS } from './nav-items.data'
import VerticalHeader from './VerticalHeader'

const Header = () => {
	const { headerRef, showVerticalHeader } = useVerticalHeader()
	return (
		<>
			<header ref={headerRef} className='bg-secondBgColor shadow-custom'>
				<div className='container'>
					<div className='wrapper flex justify-between items-center py-8'>
						<div>VZ</div>
						<LanguageSwitcher />
						<nav className='w-[473px] '>
							<ul className='flex justify-between items-center'>
								{NAV_ITEMS.map((item, index) => (
									<li key={index}>
										<Link
											href={item.link}
											className='relative font-semibold text-[15px] text-primeColor tracking-extra-tight header-link-hover'
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</header>
			{/* vertival header */}
			{showVerticalHeader && <VerticalHeader />}
		</>
	)
}

export default Header
