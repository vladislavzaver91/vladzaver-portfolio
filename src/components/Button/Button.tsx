import Link from 'next/link';
import { CSSProperties } from 'react';

interface ButtonProps {
	styles?: CSSProperties;
	typeBtn?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
	isLink?: boolean;
	href?: string;
}

const Button = ({
	typeBtn = 'button',
	disabled,
	styles,
	onClick,
	isLink = false,
	href = '#',
	children,
}: ButtonProps) => {
	const buttonElement = (
		<button
			type={typeBtn}
			disabled={disabled}
			className="button"
			onClick={onClick}
			style={{
				...styles,
			}}
		>
			{children}
		</button>
	);

	return isLink ? <Link href={href}>{buttonElement}</Link> : buttonElement;
};

export default Button;
