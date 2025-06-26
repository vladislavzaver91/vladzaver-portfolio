'use client'

import emailjs from 'emailjs-com'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

export function useContactForm() {
	const t = useTranslations('Contacts')

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [sending, setSending] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		message: '',
	})

	const validateForm = () => {
		let isValid = true
		const newErrors = {
			name: '',
			email: '',
			message: '',
		}

		// name validation
		if (!formData.name.trim()) {
			newErrors.name = t('inputName.errorMessage1')
			isValid = false
		} else if (formData.name.trim().length < 2) {
			newErrors.name = t('inputName.errorMessage2')
			isValid = false
		}

		// email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!formData.email.trim()) {
			newErrors.email = t('inputEmail.errorMessage1')
			isValid = false
		} else if (!emailRegex.test(formData.email.trim())) {
			newErrors.email = t('inputEmail.errorMessage2')
			isValid = false
		}

		// message validation
		if (!formData.message.trim()) {
			newErrors.message = t('textarea.errorMessage1')
			isValid = false
		} else if (formData.message.trim().length < 10) {
			newErrors.message = t('textarea.errorMessage2')
			isValid = false
		}

		setErrors(newErrors)
		return isValid
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))

		setErrors(prev => ({
			...prev,
			[name]: '',
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		setSending(true)
		setSuccess(false)
		setError(false)

		try {
			const result = await emailjs.sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
				e.target as HTMLFormElement,
				process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
			)

			console.log(result.text)
			setSuccess(true)
			setFormData({
				name: '',
				email: '',
				message: '',
			})
			setErrors({
				name: '',
				email: '',
				message: '',
			})
		} catch (error) {
			console.error(error)
			setError(true)
		} finally {
			setSending(false)
		}
	}

	return {
		formData,
		sending,
		success,
		error,
		errors,
		handleChange,
		handleSubmit,
		setSuccess,
		setError,
	}
}
