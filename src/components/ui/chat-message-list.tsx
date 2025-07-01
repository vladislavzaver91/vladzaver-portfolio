'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createTranslator } from 'next-intl'
import { Message } from '../../types/types'

interface ChatMessageListProps {
	messagesState: Message[]
	isTyping: boolean
	messagesContainerRef: React.RefObject<HTMLDivElement>
	messagesEndRef: React.RefObject<HTMLDivElement>
	locale: string
	allMessages: { [key: string]: any }
}

export const ChatMessageList = ({
	messagesState,
	isTyping,
	messagesContainerRef,
	messagesEndRef,
	locale,
	allMessages,
}: ChatMessageListProps) => {
	return (
		<div
			className='flex-1 p-4 overflow-y-auto max-h-[calc(100%-136px)] custom-scrollbar'
			ref={messagesContainerRef}
		>
			<AnimatePresence mode='sync'>
				{messagesState.map(msg => (
					<motion.div
						key={msg.id}
						className={`mb-4 flex ${
							msg.isBot ? 'justify-start' : 'justify-end'
						}`}
						initial={{ opacity: 0, x: msg.isBot ? -20 : 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: msg.isBot ? -20 : 20 }}
						transition={{ duration: 0.3 }}
					>
						<div
							className={`max-w-[70%] p-3 rounded-lg font-rubik ${
								msg.isBot
									? 'bg-cardBgColor/80 backdrop-blur-md text-gray-200'
									: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
							}`}
						>
							{msg.text}
						</div>
					</motion.div>
				))}
				{isTyping && (
					<motion.div
						className='flex justify-start mb-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className='bg-black/10 backdrop-blur-md text-gray-200 p-3 rounded-lg animate-pulse font-rubik'>
							{createTranslator({
								locale,
								namespace: 'Chatbot',
								messages: allMessages[locale] || {},
							})('typing')}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<div ref={messagesEndRef} />
		</div>
	)
}
