'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IoChevronDown } from 'react-icons/io5'
import { Tooltip } from './tooltip'
import { useTranslations } from 'next-intl'
import { useChatState } from '../../hooks/use-chat-hooks'

interface ChatScrollButtonProps {
	showScrollButton: boolean
	scrollToBottom: () => void
}

export const ChatScrollButton = ({
	showScrollButton,
	scrollToBottom,
}: ChatScrollButtonProps) => {
	const tChatbot = useTranslations('Chatbot')

	const { isFullscreen } = useChatState()

	if (!showScrollButton) return null

	return (
		<motion.button
			className='absolute group bottom-32 right-4 backdrop-blur-md bg-darkBgColor/70 shadow-lg hover:bg-cardBgColor transition-all duration-300 text-white p-2 rounded-xl hover:shadow-xl'
			onClick={scrollToBottom}
			aria-label='Scroll to bottom'
		>
			<IoChevronDown className='w-5 h-5' />
			{/* Tooltip */}
			{!isFullscreen && <Tooltip>{tChatbot('scrollToDown')}</Tooltip>}
		</motion.button>
	)
}
