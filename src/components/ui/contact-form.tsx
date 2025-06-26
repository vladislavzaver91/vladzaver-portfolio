'use client'

import { ButtonCustom } from './button-custom'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useContactForm } from '../../hooks/use-contact-form'
import { Loader } from './loader'
import { useEffect } from 'react'
import { InputCustom } from './input-custom'

export const ContactForm = () => {
	const {
		formData,
		sending,
		success,
		error,
		errors,
		setSuccess,
		setError,
		handleChange,
		handleSubmit,
	} = useContactForm()

	const t = useTranslations('Contacts')
	const tButtons = useTranslations('Buttons')

	useEffect(() => {
		let timer: NodeJS.Timeout

		if (success || error) {
			timer = setTimeout(() => {
				setSuccess(false)
				setError(false)
			}, 4000)
		}

		return () => clearTimeout(timer)
	}, [success, error, setSuccess, setError])

	return (
		<div className='flex-1 relative'>
			<motion.form
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}
				onSubmit={handleSubmit}
				className='flex flex-col gap-8 lg:gap-12 pb-4'
			>
				<InputCustom
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					placeholder={t('inputName.placeholder')}
					label={t('inputName.label')}
					error={errors.name}
				/>
				<InputCustom
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					placeholder={t('inputEmail.placeholder')}
					label={t('inputEmail.label')}
					error={errors.email}
				/>
				<InputCustom
					type='textarea'
					name='message'
					value={formData.message}
					onChange={handleChange}
					placeholder={t('textarea.placeholder')}
					label={t('textarea.label')}
					error={errors.message}
				/>
				<ButtonCustom
					typeBtn='submit'
					ariaLabel={tButtons('send')}
					disabled={sending}
					isLoading={sending}
				>
					{!sending && tButtons('send')}
				</ButtonCustom>
			</motion.form>

			<div className='absolute'>
				{success && (
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						className='text-green-500 mt-4'
					>
						{t('submitSuccess')}
					</motion.p>
				)}
				{error && (
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						className='text-red-500 mt-4'
					>
						{t('submitError')}
					</motion.p>
				)}
			</div>
		</div>
	)
}
