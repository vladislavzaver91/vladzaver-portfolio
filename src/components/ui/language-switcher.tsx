'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoChevronDown } from 'react-icons/io5'
import Image from 'next/image'
import { LanguageOption } from '../../types/types'

const LANGUAGES: LanguageOption[] = [
	{ code: 'en', name: 'English', flag: '/flags/en.png' },
	{ code: 'uk', name: 'Українська', flag: '/flags/uk.png' },
]

export const LanguageSwitcher = () => {
	const [isOpen, setIsOpen] = useState(false)

	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const pathname = usePathname()
	const localActive = useLocale()

	const currentLanguage =
		LANGUAGES.find(lang => lang.code === localActive) || LANGUAGES[0]

	const onSelectLanguage = (code: string) => {
		startTransition(() => {
			const newPath = `/${code}${pathname.replace(`/${localActive}`, '')}`
			router.replace(newPath)
		})
		setIsOpen(false)
	}

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				disabled={isPending}
				className='flex items-center gap-2 px-3 py-2 rounded-xl bg-transparent hover:bg-cardBgColor transition-colors duration-300 text-sm text-primeColor hover:text-accentColor group'
				aria-label='Select language'
			>
				<Image
					src={currentLanguage.flag}
					alt={currentLanguage.name}
					width={20}
					height={20}
					className='rounded-sm'
				/>
				<span className='hidden sm:inline'>{currentLanguage.name}</span>
				<IoChevronDown
					className={`w-4 h-4 transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						className='absolute top-full right-0 mt-2 w-40 backdrop-blur-md bg-darkBgColor/50 rounded-lg shadow-lg border border-gray-700 z-50 overflow-hidden'
					>
						<ul className=''>
							{LANGUAGES.map(lang => (
								<li key={lang.code}>
									<button
										onClick={() => onSelectLanguage(lang.code)}
										disabled={isPending || lang.code === localActive}
										className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-primeColor hover:bg-cardBgColor hover:text-accentColor transition-colors duration-200 ${
											lang.code === localActive
												? 'bg-secondBgColor cursor-default'
												: ''
										}`}
									>
										<Image
											src={lang.flag}
											alt={lang.name}
											width={20}
											height={20}
											className='rounded-sm'
										/>
										<span>{lang.name}</span>
									</button>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
