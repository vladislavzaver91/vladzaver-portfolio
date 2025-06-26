'use client'

import { useTranslations } from 'next-intl'
import { getExperience } from '../../data/experience.data'
import { motion } from 'framer-motion'

export const ExperienceList = () => {
	const t = useTranslations('Experience')

	const EXPERIENCE = getExperience(t)

	return (
		<ul className='flex flex-col gap-12'>
			{EXPERIENCE.map((item, index) => (
				<motion.li
					key={index}
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
				>
					<div className='flex justify-between gap-2 max-sm:flex-col mb-4 md:mb-6'>
						<h3 className='font-bold text-xl'>{item.title}</h3>
						<p className='font-normal text-base leading-normal text-secondTextColor'>
							{item.period}
						</p>
					</div>
					<p className='font-normal text-base leading-normal text-secondTextColor'>
						{item.description}
					</p>
				</motion.li>
			))}
		</ul>
	)
}
