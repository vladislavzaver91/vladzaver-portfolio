'use client'

import { ExperienceList } from './experience-list'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { TitleCustom } from '../ui/title-custom'

const Experience = () => {
	const t = useTranslations('Experience')

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
				<ExperienceList />
			</div>
		</div>
	)
}

export default Experience
