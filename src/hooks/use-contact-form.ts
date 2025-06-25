'use client'

import emailjs from 'emailjs-com'
import React, { useState } from 'react'

export function useContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [sending, setSending] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
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
		handleChange,
		handleSubmit,
		setSuccess,
		setError,
	}
}
