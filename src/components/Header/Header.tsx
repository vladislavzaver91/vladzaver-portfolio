'use client'

import { LanguageSwitcher } from '../ui/language-switcher'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ButtonCustom } from '../ui/button-custom'
import { AiFillPhone, AiOutlineDownload } from 'react-icons/ai'
import { useTranslations } from 'next-intl'
import { getNavigation } from './nav-items.data'
import { VerticalHeader } from './vertical-header'
import { useDownloadResume } from '../../hooks/use-download-resume'
import { Loader } from '../ui/loader'

export const Header = () => {
	const t = useTranslations('Header')
	const tButtons = useTranslations('Buttons')

	const NAV_ITEMS = getNavigation(t)

	const [scrolled, setScrolled] = useState(false)

	const { downloadResume, isDownloading } = useDownloadResume()

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10)
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const handleScrollToSection = (
		sectionId: string,
		event: React.MouseEvent<HTMLAnchorElement>
	) => {
		event.preventDefault()
		const section = document.getElementById(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
			// Обновляем URL без перезагрузки
			window.history.pushState(null, '', `#${sectionId}`)
		}
	}

	return (
		<AnimatePresence>
			<motion.header
				initial={{ y: -60, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -60, opacity: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className={`fixed top-0 left-0 w-full z-50 transition-all h-14 lg:h-20 ${
					scrolled
						? 'backdrop-blur-md bg-darkBgColor/50 shadow-sm'
						: 'bg-transparent'
				}`}
			>
				<div className='w-full px-4 md:px-6 lg:container lg:mx-auto h-full'>
					<div className='lg:max-w-4xl lg:mx-auto flex justify-between items-center h-full'>
						<Link
							href='#home'
							onClick={e => handleScrollToSection('home', e)}
							className='text-xl font-bold font-montserrat text-primeColor hover:text-accentColor transition-colors duration-300 tracking-tight'
							aria-label='Go to Home section'
						>
							{'<VladZaver />'}
						</Link>
						<nav className='hidden lg:flex'>
							{NAV_ITEMS.map((item, index) => (
								<Link
									key={index}
									href={`#${item.link}`}
									onClick={e => handleScrollToSection(item.link, e)}
									className='font-medium text-sm text-primeColor hover:text-accentColor hover:bg-cardBgColor transition-colors duration-300 h-20 w-28 flex items-center justify-center'
									aria-label={`Go to ${item.name} section`}
								>
									{item.name}
								</Link>
							))}
						</nav>
						<div className='lg:hidden flex ml-auto'>
							<>
								<Link
									href='#contacts'
									onClick={e => handleScrollToSection('contacts', e)}
									className='sm:hidden flex items-center justify-center p-3 rounded-xl bg-transparent text-white hover:bg-cardBgColor transition-colors duration-300 z-30 group'
									aria-label='Go to Contacts section'
								>
									<AiFillPhone className='w-5 h-5 group-hover:text-accentColor transition-colors duration-300' />
								</Link>
								<Link
									href='#contacts'
									onClick={e => handleScrollToSection('contacts', e)}
									className='max-sm:hidden font-medium text-sm text-primeColor hover:text-accentColor hover:bg-cardBgColor transition-colors duration-300 h-14 max-w-full px-2 flex items-center gap-2'
									aria-label='Go to Contacts section'
								>
									{tButtons('getInTouch')}
									<AiFillPhone className='w-4 h-4 group-hover:text-accentColor transition-colors duration-300' />
								</Link>
							</>

							<>
								<button
									className='sm:hidden flex items-center justify-center p-3 rounded-xl bg-transparent text-white hover:bg-cardBgColor transition-colors duration-300 z-30 group'
									onClick={downloadResume}
									aria-label={tButtons('downloadCv')}
									disabled={isDownloading}
								>
									{isDownloading ? (
										<Loader />
									) : (
										<AiOutlineDownload className='w-5 h-5 group-hover:text-accentColor transition-colors duration-300' />
									)}
								</button>
								<button
									className='max-sm:hidden font-medium text-sm text-primeColor hover:text-accentColor hover:bg-cardBgColor transition-colors duration-300 h-14 max-w-full px-2 flex items-center gap-2'
									onClick={downloadResume}
									aria-label={tButtons('downloadCv')}
									disabled={isDownloading}
								>
									{isDownloading ? <Loader /> : tButtons('downloadCv')}
									<AiOutlineDownload className='w-4 h-4 group-hover:text-accentColor transition-colors duration-300' />
								</button>
							</>
						</div>
						<LanguageSwitcher />
					</div>
				</div>
			</motion.header>
			{/* vertival header */}
			<VerticalHeader />
		</AnimatePresence>
	)
}
