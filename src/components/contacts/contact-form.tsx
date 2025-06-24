'use client'

import { ButtonCustom } from '../ui/button-custom'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import useContactForm from '../../hooks/useContactForm'

export const ContactForm = () => {
	const { formData, sending, success, error, handleChange, handleSubmit } =
		useContactForm()

	const t = useTranslations('Contacts')
	const tButtons = useTranslations('Buttons')

	return (
		<div className='flex-1'>
			<motion.form
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}
				onSubmit={handleSubmit}
				className='flex flex-col gap-8 lg:gap-12'
			>
				<label className='label group'>
					<span className='label-text'>{t('inputName.label')}</span>
					<input
						type='text'
						placeholder={t('inputName.placeholder')}
						name='name'
						value={formData.name}
						onChange={handleChange}
						className='label-input'
					/>
				</label>
				<label className='label group'>
					<span className='label-text'>{t('inputEmail.label')}</span>
					<input
						type='email'
						placeholder={t('inputEmail.placeholder')}
						name='email'
						value={formData.email}
						onChange={handleChange}
						className='label-input'
					/>
				</label>
				<label className='label group'>
					<span className='label-text'>{t('textarea.label')}</span>
					<textarea
						placeholder={t('textarea.placeholder')}
						name='message'
						value={formData.message}
						onChange={handleChange}
						className='label-input resize-none min-h-32'
					></textarea>
				</label>
				<ButtonCustom typeBtn='submit' disabled={sending}>
					{sending ? tButtons('sending') : tButtons('send')}
				</ButtonCustom>
			</motion.form>
			{success && <p className='text-green-500'>Message sent successfully!</p>}
			{error && (
				<p className='text-red-500'>
					Something went wrong. Please try again later.
				</p>
			)}
		</div>
	)
}
