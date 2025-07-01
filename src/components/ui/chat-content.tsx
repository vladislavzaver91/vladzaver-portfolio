'use client'

import React from 'react'
import { Message } from '../../types/types'
import { ChatHeader } from './chat-header'
import { ChatMessageList } from './chat-message-list'
import { ChatScrollButton } from './chat-scroll-button'
import { ChatInput } from './chat-input'

interface ChatContentProps {
	messagesState: Message[]
	isTyping: boolean
	isFullscreen: boolean
	showScrollButton: boolean
	scrollToBottom: () => void
	messagesContainerRef: React.RefObject<HTMLDivElement>
	messagesEndRef: React.RefObject<HTMLDivElement>
	locale: string
	allMessages: { [key: string]: any }
	input: string
	setInput: React.Dispatch<React.SetStateAction<string>>
	handleSend: () => Promise<void>
	setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>
	setHasUserSentMessage: React.Dispatch<React.SetStateAction<boolean>>
	inputRef: React.RefObject<HTMLInputElement>
}

export const ChatContent = ({
	messagesState,
	isTyping,
	isFullscreen,
	showScrollButton,
	scrollToBottom,
	messagesContainerRef,
	messagesEndRef,
	locale,
	allMessages,
	input,
	setInput,
	handleSend,
	setIsFullscreen,
	setIsOpen,
	setMessages,
	setHasUserSentMessage,
	inputRef,
}: ChatContentProps) => {
	return (
		<>
			<ChatHeader
				isFullscreen={isFullscreen}
				setIsFullscreen={setIsFullscreen}
				setIsOpen={setIsOpen}
			/>
			<ChatMessageList
				messagesState={messagesState}
				isTyping={isTyping}
				messagesContainerRef={messagesContainerRef}
				messagesEndRef={messagesEndRef}
				locale={locale}
				allMessages={allMessages}
			/>
			<ChatScrollButton
				showScrollButton={showScrollButton}
				scrollToBottom={scrollToBottom}
			/>
			<ChatInput
				input={input}
				setInput={setInput}
				handleSend={handleSend}
				inputRef={inputRef}
				locale={locale}
				allMessages={allMessages}
				setMessages={setMessages}
				setHasUserSentMessage={setHasUserSentMessage}
			/>
		</>
	)
}
