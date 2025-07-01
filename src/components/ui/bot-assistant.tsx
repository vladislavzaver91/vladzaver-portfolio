'use client'

import React from 'react'
import { useLocale } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { ResizableBox } from 'react-resizable'

import {
	useChatState,
	useDeviceDetection,
	useChatButtonVisibility,
	useMessageHandling,
	useTranslationsLoader,
	useLocalStorage,
	useScrollHandling,
	useBodyScrollControl,
	useInputFocus,
} from '../../hooks/use-chat-hooks'
import { ChatToggleButton } from './chat-toggle-button'
import { ChatContent } from './chat-content'

export const BotAssistant = () => {
	const locale = useLocale()

	// State hooks
	const {
		messagesState,
		setMessages,
		input,
		setInput,
		isTyping,
		setIsTyping,
		isOpen,
		setIsOpen,
		isFullscreen,
		setIsFullscreen,
		hasUserSentMessage,
		setHasUserSentMessage,
		allMessages,
		setAllMessages,
		showScrollButton,
		setShowScrollButton,
		chatSize,
		setChatSize,
	} = useChatState()

	// Device detection
	const { isMobile, isTabletOrSmaller } = useDeviceDetection()

	// Chat button visibility
	const { isChatButtonVisible } = useChatButtonVisibility(isTabletOrSmaller)

	// Message handling
	const { handleSend: handleSendMessage } = useMessageHandling(
		messagesState,
		setMessages,
		setInput,
		setIsTyping,
		setHasUserSentMessage,
		locale,
		allMessages
	)

	// Translations loader
	useTranslationsLoader(locale, setAllMessages, setMessages)

	// Local storage
	useLocalStorage(
		hasUserSentMessage,
		messagesState,
		setMessages,
		setHasUserSentMessage
	)

	// Scroll handling
	const { messagesEndRef, messagesContainerRef, scrollToBottom } =
		useScrollHandling(messagesState, setShowScrollButton)

	// Body scroll control
	useBodyScrollControl(isOpen, isTabletOrSmaller)

	// Input focus
	const { inputRef } = useInputFocus(isOpen)

	// Handle send wrapper
	const handleSend = async () => {
		await handleSendMessage(input)
	}

	// Handle resize
	const handleResize = (
		e: any,
		{ size }: { size: { width: number; height: number } }
	) => {
		setChatSize({ width: size.width, height: size.height })
	}

	return (
		<>
			{/* Кнопка открытия чата */}
			<ChatToggleButton
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isChatButtonVisible={isChatButtonVisible}
				isTabletOrSmaller={isTabletOrSmaller}
			/>

			{/* Окно чата */}
			<AnimatePresence mode='wait'>
				{isOpen && (
					<motion.div
						className={`fixed z-40 pointer-events-auto ${
							isTabletOrSmaller
								? 'inset-0 flex justify-end items-end p-4'
								: 'bottom-6 right-6 p-6'
						}`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
					>
						{isFullscreen ? (
							<div className='fixed inset-0 m-4 md:m-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-lg shadow-xl flex flex-col z-40 border border-white/20 overflow-auto pointer-events-auto'>
								<ChatContent
									messagesState={messagesState}
									isTyping={isTyping}
									isFullscreen={isFullscreen}
									showScrollButton={showScrollButton}
									scrollToBottom={scrollToBottom}
									messagesContainerRef={messagesContainerRef}
									messagesEndRef={messagesEndRef}
									locale={locale}
									allMessages={allMessages}
									input={input}
									setInput={setInput}
									handleSend={handleSend}
									setIsFullscreen={setIsFullscreen}
									setIsOpen={setIsOpen}
									setMessages={setMessages}
									setHasUserSentMessage={setHasUserSentMessage}
									inputRef={inputRef}
								/>
							</div>
						) : (
							<ResizableBox
								width={isMobile ? window.innerWidth - 48 : chatSize.width}
								height={chatSize.height}
								minConstraints={[360, 300]}
								maxConstraints={[
									isMobile ? window.innerWidth - 48 : 800,
									typeof window !== 'undefined'
										? window.innerHeight * 0.8
										: 500,
								]}
								resizeHandles={isTabletOrSmaller ? [] : ['nw']}
								className={`flex flex-col bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-lg shadow-xl z-40 border border-white/20 pointer-events-auto ${
									isMobile
										? 'w-full'
										: isTabletOrSmaller
										? 'resize-none'
										: 'md:min-w-[360px]'
								}`}
								onResize={handleResize}
							>
								<ChatContent
									messagesState={messagesState}
									isTyping={isTyping}
									isFullscreen={isFullscreen}
									showScrollButton={showScrollButton}
									scrollToBottom={scrollToBottom}
									messagesContainerRef={messagesContainerRef}
									messagesEndRef={messagesEndRef}
									locale={locale}
									allMessages={allMessages}
									input={input}
									setInput={setInput}
									handleSend={handleSend}
									setIsFullscreen={setIsFullscreen}
									setIsOpen={setIsOpen}
									setMessages={setMessages}
									setHasUserSentMessage={setHasUserSentMessage}
									inputRef={inputRef}
								/>
							</ResizableBox>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
