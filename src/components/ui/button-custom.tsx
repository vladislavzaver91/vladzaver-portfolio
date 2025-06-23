import Link from 'next/link'
import { CSSProperties } from 'react'

interface ButtonCustomProps {
	styles?: CSSProperties
	typeBtn?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	children: React.ReactNode
	onClick?: () => void
	isLink?: boolean
	href?: string
}

export const ButtonCustom = ({
	typeBtn = 'button',
	disabled,
	styles,
	onClick,
	isLink = false,
	href = '#',
	children,
}: ButtonCustomProps) => {
	const buttonElement = (
		<button
			type={typeBtn}
			disabled={disabled}
			className='button'
			onClick={onClick}
			style={{
				...styles,
			}}
		>
			{children}
		</button>
	)

	return isLink ? <Link href={href}>{buttonElement}</Link> : buttonElement
}
