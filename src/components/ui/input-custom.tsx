'use client'

import { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'

interface InputCustomProps {
	label: string
	placeholder?: string
	name: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	type?: 'text' | 'email' | 'textarea'
	error?: boolean
	errorMessage?: string
	className?: string
}

export const InputCustom = ({
	label,
	placeholder,
	name,
	value,
	onChange,
	type = 'text',
	error = false,
	errorMessage,
	className = '',
}: InputCustomProps) => {
	const [isFocused, setIsFocused] = useState(false)

	const commonClasses = `w-full px-4 py-2 rounded-lg bg-darkBgColor/50 text-primeColor placeholder-secondColor/50 focus:outline-none focus:ring-2 focus:ring-accentColor transition-all duration-300 ${className} ${
		error ? 'border border-red-500' : 'border-none'
	}`

	const inputProps = {
		name,
		value,
		onChange,
		placeholder,
		onFocus: () => setIsFocused(true),
		onBlur: () => setIsFocused(false),
		className: commonClasses,
		'aria-invalid': error,
		'aria-describedby': error && errorMessage ? `${name}-error` : undefined,
	}

	return (
		<label className='flex flex-col gap-2 group'>
			<span
				className={`text-sm font-medium text-primeColor transition-all duration-300 ${
					isFocused || value ? 'translate-y-0 opacity-100' : 'opacity-75'
				}`}
			>
				{label}
			</span>
			{type === 'textarea' ? (
				<textarea
					{...inputProps}
					className={`${commonClasses} resize-none min-h-32`}
				/>
			) : (
				<input {...inputProps} type={type} />
			)}
			{error && errorMessage && (
				<motion.p
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-red-500 text-sm mt-1'
					id={`${name}-error`}
				>
					{errorMessage}
				</motion.p>
			)}
		</label>
	)
}
