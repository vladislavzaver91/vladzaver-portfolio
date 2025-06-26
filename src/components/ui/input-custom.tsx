'use client'

import { ChangeEvent, CSSProperties, forwardRef } from 'react'
interface InputCustomProps {
	type?: 'text' | 'email' | 'textarea'
	name: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	placeholder?: string
	label: string
	error?: string
	className?: string
	styles?: CSSProperties
}

export const InputCustom = forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	InputCustomProps
>(
	(
		{
			type = 'text',
			name,
			value,
			onChange,
			placeholder,
			label,
			error,
			className = '',
			styles,
		},
		ref
	) => {
		const commonProps = {
			name,
			value,
			onChange,
			placeholder,
			className: `label-input ${className} ${error ? 'border-red-500' : ''}`,
			style: styles,
		}

		return (
			<label className='label group relative pb-8'>
				<span className='label-text'>{label}</span>
				{type === 'textarea' ? (
					<textarea
						{...commonProps}
						ref={ref as React.Ref<HTMLTextAreaElement>}
						className={`${commonProps.className} resize-none min-h-32`}
					/>
				) : (
					<input
						{...commonProps}
						type={type}
						ref={ref as React.Ref<HTMLInputElement>}
					/>
				)}
				{error && (
					<span className='absolute -bottom-3 text-red-500 text-sm lowercase h-10'>
						{error}
					</span>
				)}
			</label>
		)
	}
)

InputCustom.displayName = 'InputCustom'
