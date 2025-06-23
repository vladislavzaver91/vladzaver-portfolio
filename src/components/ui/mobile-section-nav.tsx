'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NAV_ITEMS } from '@/components/header/nav-items.data'
import { IoChevronUp, IoChevronDown } from 'react-icons/io5'

export const MobileSectionNav = () => {
	const [currentSection, setCurrentSection] = useState(NAV_ITEMS[0].link)
	const [isVisible, setIsVisible] = useState(true)

	// Отслеживание текущей секции
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setCurrentSection(entry.target.id)
					}
				})
			},
			{ threshold: 0.5 } // Секция считается видимой, если видна на 50%
		)

		NAV_ITEMS.forEach(item => {
			const section = document.getElementById(item.link)
			if (section) observer.observe(section)
		})

		return () => observer.disconnect()
	}, [])

	// Плавный скролл к секции
	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
		}
	}

	// Переключение вверх/вниз
	const handleNavigate = (direction: 'up' | 'down') => {
		const currentIndex = NAV_ITEMS.findIndex(
			item => item.link === currentSection
		)
		let nextIndex = currentIndex

		if (direction === 'up' && currentIndex > 0) {
			nextIndex = currentIndex - 1
		} else if (direction === 'down' && currentIndex < NAV_ITEMS.length - 1) {
			nextIndex = currentIndex + 1
		}

		scrollToSection(NAV_ITEMS[nextIndex].link)
	}

	// Скрытие навигации при достижении футера
	useEffect(() => {
		const handleScroll = () => {
			const footer = document.getElementById('footer')
			if (footer) {
				const rect = footer.getBoundingClientRect()
				setIsVisible(rect.top > window.innerHeight)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const CurrentIcon =
		NAV_ITEMS.find(item => item.link === currentSection)?.icon ||
		NAV_ITEMS[0].icon

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				className='fixed bottom-4 right-4 z-50 flex flex-col items-center gap-2 lg:hidden'
			>
				{/* Стрелка вверх */}
				<motion.button
					onClick={() => handleNavigate('up')}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className='p-2 rounded-xl backdrop-blur-md bg-darkBgColor/50 shadow-sm text-primeColor hover:bg-cardBgColor focus:bg-cardBgColor hover: focus:text-accentColor transition-colors duration-300 group'
					aria-label='Navigate to previous section'
					disabled={currentSection === NAV_ITEMS[0].link}
				>
					<IoChevronUp className='w-6 h-6 group-hover:text-accentColor group-focus:text-accentColor transition-colors duration-300' />
				</motion.button>

				{/* Иконка текущей секции */}
				<motion.div
					key={currentSection}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{ duration: 0.2 }}
					className='p-2 rounded-xl backdrop-blur-md bg-darkBgColor/50 shadow-sm text-primeColor'
					aria-label={`Current section: ${
						NAV_ITEMS.find(item => item.link === currentSection)?.name
					}`}
				>
					<CurrentIcon className='w-6 h-6' />
				</motion.div>

				{/* Стрелка вниз */}
				<motion.button
					onClick={() => handleNavigate('down')}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className='p-2 rounded-xl backdrop-blur-md bg-darkBgColor/50 shadow-sm text-primeColor hover:bg-cardBgColor focus:bg-cardBgColor hover: focus:text-accentColor transition-colors duration-300 group'
					aria-label='Navigate to next section'
					disabled={currentSection === NAV_ITEMS[NAV_ITEMS.length - 1].link}
				>
					<IoChevronDown className='w-6 h-6 group-hover:text-accentColor group-focus:text-accentColor transition-colors duration-300' />
				</motion.button>
			</motion.div>

			{/* Кнопка "Наверх" на футере */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: isVisible ? 0 : 1, y: isVisible ? 20 : 0 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				className='fixed bottom-4 right-4 z-50 lg:hidden'
			>
				<motion.button
					onClick={() => scrollToSection('home')}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className='p-2 rounded-xl backdrop-blur-md bg-darkBgColor/50 shadow-sm text-primeColor hover:bg-cardBgColor focus:bg-cardBgColor hover: focus:text-accentColor transition-colors duration-300 group'
					aria-label='Scroll to top'
				>
					<IoChevronUp className='w-6 h-6 group-hover:text-accentColor group-focus:text-accentColor transition-colors duration-300' />
				</motion.button>
			</motion.div>
		</>
	)
}
