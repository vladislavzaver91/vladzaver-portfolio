import Link from 'next/link'
import { CSSProperties, ReactNode } from 'react'
import { Loader } from './loader'

interface ButtonCustomProps {
	styles?: CSSProperties
	typeBtn?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	isLoading?: boolean
	icon?: ReactNode
	iconPosition?: 'left' | 'right'
	iconStyles?: string
	className?: string
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
	icon,
	iconPosition = 'left',
	styles,
	iconStyles,
	className = '',
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
			style={styles}
			className={`button flex items-center justify-center gap-2 ${className}`}
			aria-label={ariaLabel}
		>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{icon && iconPosition === 'left' && icon}
					{children}
					{icon && iconPosition === 'right' && icon}
				</>
			)}
		</button>
	)

	return isLink ? <Link href={href}>{buttonContent}</Link> : buttonContent
}
