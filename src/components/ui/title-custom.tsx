'use client'

import React, { CSSProperties } from 'react'

interface TitleProps {
	children: React.ReactNode
	style?: CSSProperties
	className?: string
	mainTitle?: boolean
}

export const TitleCustom = ({
	style,
	children,
	className,
	mainTitle,
}: TitleProps) => {
	return (
		<h2
			className={`${mainTitle ? 'main-title' : ''} ${className}`}
			style={{
				...style,
			}}
		>
			{children}
		</h2>
	)
}
