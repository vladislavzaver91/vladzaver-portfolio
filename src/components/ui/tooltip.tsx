'use client'

import { ReactNode } from 'react'

export const Tooltip = ({ children }: { children: ReactNode }) => {
	return (
		<span className='max-lg:hidden absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md whitespace-nowrap'>
			{children}
		</span>
	)
}
