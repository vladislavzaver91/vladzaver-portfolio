import Link from 'next/link'
import { CSSProperties, ElementType } from 'react'
import { Loader } from './loader'

interface ButtonCustomProps {
	styles?: CSSProperties
	typeBtn?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	isLoading?: boolean
	icon?: ElementType
	iconStyles?: string
	children: React.ReactNode
	onClick?: () => void
	isLink?: boolean
	href?: string
	ariaLabel?: string
}

export const ButtonCustom = ({
	typeBtn = 'button',
	disabled = false,
	isLoading = false,
	icon: Icon,
	styles,
	iconStyles,
	onClick,
	isLink = false,
	href = '#',
	children,
	ariaLabel,
}: ButtonCustomProps) => {
	const buttonContent = (
		<button
			type={typeBtn}
			disabled={disabled || isLoading}
			onClick={onClick}
			style={{
				...styles,
			}}
			className={`button ${
				disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
			}
        ${children && Icon ? 'pl-3' : ''}`}
			aria-label={
				ariaLabel || (typeof children === 'string' ? children : undefined)
			}
			aria-disabled={disabled || isLoading}
		>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{Icon && <Icon className={`w-5 h-5 ${iconStyles}`} />}
					{children}
				</>
			)}
		</button>
	)

	return isLink ? <Link href={href}>{buttonContent}</Link> : buttonContent
}
