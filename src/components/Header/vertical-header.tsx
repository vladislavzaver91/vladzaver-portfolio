'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getNavigation } from './nav-items.data'

export const VerticalHeader = () => {
	const t = useTranslations('Header')

	const NAV_ITEMS = getNavigation(t)

	const navVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: 'easeOut',
				staggerChildren: 0.1, // Плавное появление иконок по очереди
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.3 } },
	}

	const handleScrollToSection = (
		sectionId: string,
		event: React.MouseEvent<HTMLAnchorElement>
	) => {
		event.preventDefault()
		const section = document.getElementById(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
			window.history.pushState(null, '', `#${sectionId}`)
		}
	}

	return (
		<motion.nav
			initial='hidden'
			animate='visible'
			variants={navVariants}
			className='hidden xl:flex fixed left-20 top-1/3 flex-col gap-5 z-40'
		>
			{NAV_ITEMS.map((item, index) => (
				<motion.div key={index} variants={itemVariants}>
					<Link
						href={`#${item.link}`}
						onClick={e => handleScrollToSection(item.link, e)}
						className='flex items-center justify-center p-3 rounded-xl backdrop-blur-md bg-darkBgColor/50 shadow-sm text-white hover:bg-cardBgColor transition-colors duration-300 z-30 relative group'
						aria-label={`Go to ${item.name} section`}
					>
						<item.icon className='w-6 h-6 group-hover:text-accentColor transition-colors duration-300' />
						{/* Tooltip */}
						<span className='absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md whitespace-nowrap'>
							{item.name}
						</span>
					</Link>
				</motion.div>
			))}
		</motion.nav>
	)
}
