'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MdOutlineChat } from 'react-icons/md'

interface ChatToggleButtonProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isChatButtonVisible: boolean
	isTabletOrSmaller: boolean
}

export const ChatToggleButton = ({
	isOpen,
	setIsOpen,
	isChatButtonVisible,
	isTabletOrSmaller,
}: ChatToggleButtonProps) => {
	return (
		<motion.button
			className={`fixed w-12 h-12 lg:w-16 lg:h-16 bottom-16 z-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:text-secondTextColor focus:text-secondTextColor p-3 rounded-full shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 flex items-center justify-center pointer-events-auto ${
				isTabletOrSmaller ? 'top-16 right-6' : 'bottom-6 right-8'
			}`}
			onClick={() => setIsOpen(!isOpen)}
			initial={{ opacity: 0, x: 20 }}
			animate={{
				opacity: isChatButtonVisible ? 1 : 0,
				x: isChatButtonVisible ? 0 : 20,
			}}
			transition={{ duration: 0.3, ease: 'easeOut' }}
			aria-label='Toggle chat'
		>
			<MdOutlineChat className='w-6 h-6' />
		</motion.button>
	)
}
