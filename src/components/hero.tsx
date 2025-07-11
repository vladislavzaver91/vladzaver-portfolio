'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RiArrowDownDoubleFill } from 'react-icons/ri'
import { ButtonCustom } from './ui/button-custom'
import { useDownloadResume } from '../hooks/use-download-resume'
import { Loader } from './ui/loader'

const Hero = () => {
	const t = useTranslations('Hero')
	const tButtons = useTranslations('Buttons')

	const { downloadResume, isDownloading } = useDownloadResume()

	const handleScrollToAbout = () => {
		const aboutSection = document.getElementById('about')
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<div className='custom-container pt-14'>
			<div className='wrapper flex flex-col items-center space-y-8 lg:space-y-10'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className='overflow-hidden relative rounded-full w-36 h-36 lg:w-[213px] lg:h-[213px] bg-[linear-gradient(138deg,_#ff8660_0%,_#8000ff_98.96%)]'
				>
					<Image
						src='/main/Zavertaylo_V.png'
						alt='Vladislav Zavertaylo'
						fill
						sizes='(max-width: 768px) 100vw, 213px'
						className='object-cover object-top'
					/>
				</motion.div>
				<motion.h1
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className='font-extrabold text-3xl lg:text-6xl leading-[1.15] text-primeColor font-montserrat text-center'
				>
					{t('title')} <br />
					<span className='gradient-text'>{t('position')}</span>
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className='font-light text-base lg:text-lg text-secondColor  tracking-extra-tight text-center'
				>
					{t('description')}
				</motion.p>
				<div className='flex gap-5 max-sm:flex-col'>
					<ButtonCustom
						isLink
						href='#contacts'
						styles={{ minWidth: 210 }}
						ariaLabel={tButtons('getInTouch')}
					>
						{tButtons('getInTouch')}
					</ButtonCustom>
					<ButtonCustom
						styles={{ minWidth: 210 }}
						onClick={downloadResume}
						ariaLabel={tButtons('downloadCv')}
						disabled={isDownloading}
						isLoading={isDownloading}
					>
						{!isDownloading && tButtons('downloadCv')}
					</ButtonCustom>
				</div>

				{/* Анимированная стрелка вниз */}
				<motion.button
					onClick={handleScrollToAbout}
					className='mt-8 text-primeColor hover:text-accentColor transition-colors duration-300'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					aria-label='Scroll to About section'
				>
					<RiArrowDownDoubleFill className='w-8 h-8 lg:w-10 lg:h-10 animate-pulse-down' />
				</motion.button>
			</div>
		</div>
	)
}

export default Hero
