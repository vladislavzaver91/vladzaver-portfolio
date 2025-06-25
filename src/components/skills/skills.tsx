'use client'

import { useTranslations } from 'next-intl'
import { TitleCustom } from '../ui/title-custom'
import { SkillIconList } from './skill-icon-list'
import { motion } from 'framer-motion'

export const Skills = () => {
	const t = useTranslations('Skills')

	return (
		<div className='section-component custom-container'>
			<div className='wrapper'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					<TitleCustom className='font-medium text-xl tracking-widest text-secondTextColor text-center uppercase max-lg:mb-[25px] lg:mb-[55px]'>
						{t('title')}
					</TitleCustom>
				</motion.div>
				<SkillIconList />
			</div>
		</div>
	)
}
