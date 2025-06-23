'use client'

import { TitleCustom } from '@/components/ui/title-custom'
import { ExperienceList } from './experience-list'
import { motion } from 'framer-motion'

export const Experience = () => {
	return (
		<div id='experience' className='section-component custom-container'>
			<div className='wrapper'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					<TitleCustom mainTitle>Experience</TitleCustom>
				</motion.div>
				<ExperienceList />
			</div>
		</div>
	)
}
