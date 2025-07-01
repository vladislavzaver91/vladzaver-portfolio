'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { createTranslator, useTranslations } from 'next-intl'
import { Message } from '../../types/types'
import { Tooltip } from './tooltip'
import { AiOutlineSend } from 'react-icons/ai'
import { useChatState } from '../../hooks/use-chat-hooks'

interface ChatInputProps {
	input: string
	setInput: React.Dispatch<React.SetStateAction<string>>
	handleSend: () => Promise<void>
	inputRef: React.RefObject<HTMLInputElement>
	locale: string
	allMessages: { [key: string]: any }
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>
	setHasUserSentMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChatInput = ({
	input,
	setInput,
	handleSend,
	inputRef,
	locale,
	allMessages,
	setMessages,
	setHasUserSentMessage,
}: ChatInputProps) => {
	const tChatbot = useTranslations('Chatbot')
	const tButtons = useTranslations('Buttons')

	const { isFullscreen } = useChatState()

	const handleClearChat = () => {
		localStorage.removeItem('chatbotMessages')
		setMessages([
			{
				id: 1,
				text: createTranslator({
					locale,
					namespace: 'Chatbot',
					messages: allMessages[locale] || {},
				})('greeting'),
				isBot: true,
			},
		])
		setHasUserSentMessage(false)
	}

	return (
		<div className='p-4 border-t border-white/20'>
			<div className='flex gap-2'>
				<input
					type='text'
					ref={inputRef}
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyDown={e => e.key === 'Enter' && handleSend()}
					className='flex-1 p-2 bg-cardBgColor/80 backdrop-blur-md text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-rubik'
				/>
				<motion.button
					onClick={handleSend}
					className='relative group bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:text-secondTextColor  focus:text-secondTextColor transition-colors duration-300 px-4 py-2 rounded-xl'
					aria-label='Send message'
				>
					<AiOutlineSend className='w-5 h-5' />
					{/* Tooltip */}
					{!isFullscreen && <Tooltip>{tChatbot('send')}</Tooltip>}
				</motion.button>
			</div>
			<motion.button
				onClick={handleClearChat}
				className='backdrop-blur-md bg-darkBgColor/70 shadow-sm hover:bg-cardBgColor transition-colors duration-300 text-white px-3 py-2 rounded-xl  mt-2 font-rubik'
				aria-label='Clear chat'
			>
				{tButtons('clearChat')}
			</motion.button>
		</div>
	)
}
