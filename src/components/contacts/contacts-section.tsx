'use client'

import { useTranslations } from 'next-intl'
import { ContactForm } from './contact-form'
import { motion } from 'framer-motion'

export const ContactsSection = () => {
	const t = useTranslations('Contacts')

	return (
		<div id='contacts' className='section-component custom-container'>
			<div className='wrapper'>
				<div className=' flex gap-4 md:gap-8 max-md:flex-col m w-full'>
					<motion.h3
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						className='flex-1 font-extrabold text-3xl lg:text-5xl leading-[1.15] text-primeColor font-montserrat'
					>
						{t('title')}
					</motion.h3>
					<ContactForm />
				</div>
			</div>
		</div>
	)
}
