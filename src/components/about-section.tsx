'use client'

import { useTranslations } from 'next-intl'
import { TitleCustom } from './ui/title-custom'
import { motion } from 'framer-motion'
import { AboutContent } from './ui/about-content'

const AboutSection = () => {
	const t = useTranslations('About')

	return (
		<div className='section-component custom-container'>
			<div className='wrapper'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					<TitleCustom mainTitle>{t('title')}</TitleCustom>
				</motion.div>
				<AboutContent />
			</div>
		</div>
	)
}

export default AboutSection
