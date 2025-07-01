'use client'

import { useState, useEffect, useRef } from 'react'
import { createTranslator } from 'next-intl'
import { Message } from '../types/types'
import {
	LanguageDetectionService,
	MessageParsingService,
	ResponseGeneratorService,
	LocalStorageService,
} from '../services/chat.service'

export const useChatState = () => {
	const [messagesState, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
	const [hasUserSentMessage, setHasUserSentMessage] = useState<boolean>(false)
	const [allMessages, setAllMessages] = useState<{ [key: string]: any }>({})
	const [showScrollButton, setShowScrollButton] = useState<boolean>(false)
	const [chatSize, setChatSize] = useState({ width: 360, height: 500 })

	return {
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
	}
}

export const useDeviceDetection = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false)
	const [isTabletOrSmaller, setIsTabletOrSmaller] = useState<boolean>(false)

	useEffect(() => {
		const updateDevice = () => {
			if (typeof window !== 'undefined') {
				setIsMobile(window.innerWidth < 768)
				setIsTabletOrSmaller(window.innerWidth <= 1024)
			}
		}
		updateDevice()
		window.addEventListener('resize', updateDevice)
		return () => window.removeEventListener('resize', updateDevice)
	}, [])

	return { isMobile, isTabletOrSmaller }
}

export const useChatButtonVisibility = (isTabletOrSmaller: boolean) => {
	const [isChatButtonVisible, setIsChatButtonVisible] = useState<boolean>(true)
	const [lastScrollY, setLastScrollY] = useState(0)

	useEffect(() => {
		if (!isTabletOrSmaller) return

		let scrollTimeout: NodeJS.Timeout
		const handleScroll = () => {
			const currentScrollY = window.scrollY
			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsChatButtonVisible(false)
			} else if (currentScrollY < lastScrollY) {
				setIsChatButtonVisible(true)
			}

			clearTimeout(scrollTimeout)
			scrollTimeout = setTimeout(() => {
				setIsChatButtonVisible(true)
			}, 150)

			setLastScrollY(currentScrollY)
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
			clearTimeout(scrollTimeout)
		}
	}, [isTabletOrSmaller, lastScrollY])

	return { isChatButtonVisible }
}

export const useMessageHandling = (
	messagesState: Message[],
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
	setInput: React.Dispatch<React.SetStateAction<string>>,
	setIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
	setHasUserSentMessage: React.Dispatch<React.SetStateAction<boolean>>,
	locale: string,
	allMessages: { [key: string]: any }
) => {
	const languageService = new LanguageDetectionService()
	const parsingService = new MessageParsingService()
	const responseService = new ResponseGeneratorService()

	const handleSend = async (input: string) => {
		if (!input.trim()) return

		const userMessage: Message = {
			id: messagesState.length + 1,
			text: input,
			isBot: false,
		}
		setMessages([...messagesState, userMessage])
		setHasUserSentMessage(true)
		setInput('')
		setIsTyping(true)

		await new Promise(resolve => setTimeout(resolve, 1000))

		const userLang = languageService.detectLanguage(input, locale)
		const tDynamic = createTranslator({
			locale: userLang,
			namespace: 'Chatbot',
			messages: allMessages[userLang] || allMessages[locale] || {},
		})

		const parseResult = parsingService.parseMessage(input)
		const botResponse = responseService.generateResponse(parseResult, tDynamic)

		const botMessage: Message = {
			id: messagesState.length + 2,
			text: botResponse,
			isBot: true,
		}
		setMessages(prev => [...prev, botMessage])
		setIsTyping(false)
	}

	return { handleSend }
}

export const useTranslationsLoader = (
	locale: string,
	setAllMessages: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>,
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
	useEffect(() => {
		const loadTranslations = async () => {
			try {
				const enMessages = (await import('../messages/en.json')).default
				const ukMessages = (await import('../messages/uk.json')).default
				setAllMessages({ en: enMessages, uk: ukMessages })

				const t = createTranslator({
					locale,
					namespace: 'Chatbot',
					messages: { Chatbot: enMessages.Chatbot },
				})
				setMessages([{ id: 1, text: t('greeting'), isBot: true }])
			} catch (error) {
				console.error('Error loading translations:', error)
			}
		}
		loadTranslations()
	}, [locale, setAllMessages, setMessages])
}

export const useLocalStorage = (
	hasUserSentMessage: boolean,
	messagesState: Message[],
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
	setHasUserSentMessage: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const storageService = new LocalStorageService()

	// Load messages from localStorage
	useEffect(() => {
		const savedMessages = storageService.loadMessages()
		if (savedMessages) {
			setMessages(savedMessages)
			setHasUserSentMessage(true)
		}
	}, [setMessages, setHasUserSentMessage])

	// Save messages to localStorage
	useEffect(() => {
		if (hasUserSentMessage && messagesState.length > 0) {
			storageService.saveMessages(messagesState)
		}
	}, [messagesState, hasUserSentMessage])
}

export const useScrollHandling = (
	messagesState: Message[],
	setShowScrollButton: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	// Handle scroll button visibility
	useEffect(() => {
		const handleScroll = () => {
			if (messagesContainerRef.current) {
				const { scrollTop, scrollHeight, clientHeight } =
					messagesContainerRef.current
				const isScrolledUp = scrollTop + clientHeight < scrollHeight - 10
				setShowScrollButton(isScrolledUp)
			}
		}

		const container = messagesContainerRef.current
		if (container) {
			container.addEventListener('scroll', handleScroll)
			return () => container.removeEventListener('scroll', handleScroll)
		}
	}, [messagesState, setShowScrollButton])

	return { messagesEndRef, messagesContainerRef, scrollToBottom }
}

export const useBodyScrollControl = (
	isOpen: boolean,
	isTabletOrSmaller: boolean
) => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth
			if (isTabletOrSmaller && isOpen) {
				document.body.style.overflow = 'hidden'
				document.body.style.paddingRight = `${scrollbarWidth}px`
			} else {
				document.body.style.overflow = 'auto'
				document.body.style.paddingRight = '0'
			}
			return () => {
				document.body.style.overflow = 'auto'
				document.body.style.paddingRight = '0'
			}
		}
	}, [isOpen, isTabletOrSmaller])
}

export const useInputFocus = (isOpen: boolean) => {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isOpen])

	return { inputRef }
}
