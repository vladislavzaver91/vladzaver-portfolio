'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IoChevronUp } from 'react-icons/io5'
import { useTranslations } from 'next-intl'
import { getNavigation } from '../../data/nav-items.data'

// Компонент мобильной навигации с иконками
export const MobileScrollProgressNav = () => {
	const t = useTranslations('Header')
	const NAV_ITEMS = getNavigation(t)

	// Состояния
	const [currentSection, setCurrentSection] = useState(NAV_ITEMS[0].link)
	const [isNavVisible, setIsNavVisible] = useState(true)
	const [isScrollTopVisible, setIsScrollTopVisible] = useState(false)
	const [lastScrollY, setLastScrollY] = useState(0)

	// Отслеживание текущей секции
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				let mostVisibleSection = currentSection
				let maxRatio = 0

				entries.forEach(entry => {
					if (entry.intersectionRatio > maxRatio) {
						maxRatio = entry.intersectionRatio
						mostVisibleSection = entry.target.id
					}
				})

				if (maxRatio > 0) {
					setCurrentSection(mostVisibleSection)
				}
			},
			{ threshold: [0.3, 0.5, 0.7] }
		)

		NAV_ITEMS.forEach(item => {
			const section = document.getElementById(item.link)
			if (section) observer.observe(section)
		})

		return () => observer.disconnect()
	}, [NAV_ITEMS, currentSection])

	// Плавный скролл к секции
	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
			setCurrentSection(sectionId)
		}
	}

	// Управление видимостью панели и кнопки "Наверх"
	useEffect(() => {
		let scrollTimeout: NodeJS.Timeout

		const handleScroll = () => {
			const footer = document.getElementById('footer')
			const currentScrollY = window.scrollY

			if (footer) {
				const rect = footer.getBoundingClientRect()
				if (rect.top <= window.innerHeight) {
					setIsNavVisible(false)
					setIsScrollTopVisible(true)
					clearTimeout(scrollTimeout)
					setLastScrollY(currentScrollY)
					return
				} else {
					setIsScrollTopVisible(false)
				}
			}

			// Скрываем панель при скролле вниз, показываем при скролле вверх
			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsNavVisible(false)
			} else if (currentScrollY < lastScrollY) {
				setIsNavVisible(true)
			}

			// Показываем панель при остановке скролла
			clearTimeout(scrollTimeout)
			scrollTimeout = setTimeout(() => {
				if (
					footer &&
					footer.getBoundingClientRect().top <= window.innerHeight
				) {
					return
				}
			}, 150)

			setLastScrollY(currentScrollY)
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
			clearTimeout(scrollTimeout)
		}
	}, [lastScrollY])

	return (
		<>
			{/* Панель навигации с иконками */}
			<motion.nav
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: isNavVisible ? 1 : 0, x: isNavVisible ? 0 : 20 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				className='fixed bottom-8 right-4 z-40 flex flex-col items-center gap-2 p-2 rounded-2xl backdrop-blur-md bg-gradient-to-b from-darkBgColor/30 to-darkBgColor/50 shadow-lg lg:hidden'
				aria-label='Mobile section navigation'
			>
				{NAV_ITEMS.map(item => {
					const Icon = item.icon
					return (
						<motion.button
							key={item.link}
							onClick={() => scrollToSection(item.link)}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
							className={`p-2 rounded-lg transition-colors duration-300 ${
								currentSection === item.link
									? 'bg-accentColor/20 text-accentColor'
									: 'bg-transparent text-primeColor focus:bg-accentColor/20'
							}`}
							aria-label={`Navigate to ${item.name} section`}
							aria-current={currentSection === item.link ? 'page' : undefined}
						>
							<Icon
								className={`w-6 h-6 ${
									currentSection === item.link ? 'scale-125' : ''
								}`}
							/>
						</motion.button>
					)
				})}
			</motion.nav>

			{/* Кнопка "Наверх" при достижении футера */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{
					opacity: isScrollTopVisible ? 1 : 0,
					y: isScrollTopVisible ? 0 : 20,
				}}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				className='fixed bottom-8 right-4 z-50 lg:hidden'
			>
				<motion.button
					onClick={() => scrollToSection('home')}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9 }}
					className='p-2 rounded-lg backdrop-blur-md bg-darkBgColor/50 shadow-sm text-primeColor focus:bg-cardBgColor hover:text-accentColor focus:text-accentColor transition-colors duration-300'
					aria-label='Scroll to top'
				>
					<IoChevronUp className='w-6 h-6' />
				</motion.button>
			</motion.div>
		</>
	)
}
