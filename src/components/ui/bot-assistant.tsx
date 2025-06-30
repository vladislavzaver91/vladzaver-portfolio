'use client'

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocale, createTranslator, useTranslations } from 'next-intl'
import { franc } from 'franc'
import nlp from 'compromise'
import { AnimatePresence, motion } from 'framer-motion'
import { ResizableBox } from 'react-resizable'
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { MdOutlineFullscreen, MdOutlineChat } from 'react-icons/md'
import { Message } from '../../types/types'
import { IoChevronDown } from 'react-icons/io5'
import { PROJECT_KEYWORDS } from '../../data/project-keywords.data'

export const BotAssistant = () => {
	const locale = useLocale()

	const [messagesState, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
	const [hasUserSentMessage, setHasUserSentMessage] = useState<boolean>(false)
	const [allMessages, setAllMessages] = useState<{ [key: string]: any }>({})
	const [showScrollButton, setShowScrollButton] = useState<boolean>(false)
	const [isMobile, setIsMobile] = useState<boolean>(false)
	const [isTabletOrSmaller, setIsTabletOrSmaller] = useState<boolean>(false)
	const [chatSize, setChatSize] = useState({ width: 360, height: 500 })
	const [isChatButtonVisible, setIsChatButtonVisible] = useState<boolean>(true)
	const [lastScrollY, setLastScrollY] = useState(0)

	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	// Обновление статуса мобильного устройства и планшета
	useLayoutEffect(() => {
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

	// Управление видимостью кнопки чата при скролле (для мобильных и планшетов)
	useLayoutEffect(() => {
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

	// Фокус на input при открытии чата
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isOpen])

	// Загрузка переводов для всех локалей
	useLayoutEffect(() => {
		const loadTranslations = async () => {
			try {
				const enMessages = (await import('../../messages/en.json')).default
				const ukMessages = (await import('../../messages/uk.json')).default
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
	}, [locale])

	// Установка приветственного сообщения при смене языка
	useEffect(() => {
		if (allMessages[locale] && !hasUserSentMessage) {
			const t = createTranslator({
				locale,
				namespace: 'Chatbot',
				messages: allMessages[locale] || {},
			})
			setMessages([{ id: 1, text: t('greeting'), isBot: true }])
		}
	}, [locale, allMessages, hasUserSentMessage])

	// Загрузка сообщений из localStorage
	useLayoutEffect(() => {
		if (typeof window !== 'undefined') {
			const savedMessages = localStorage.getItem('chatbotMessages')
			if (savedMessages) {
				setMessages(JSON.parse(savedMessages))
				setHasUserSentMessage(true)
			}
		}
	}, [])

	// Сохранение сообщений в localStorage
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			hasUserSentMessage &&
			messagesState.length > 0
		) {
			localStorage.setItem('chatbotMessages', JSON.stringify(messagesState))
		}
		scrollToBottom()
	}, [messagesState, hasUserSentMessage])

	// Отключение скролла body и добавление padding-right для компенсации скроллбара
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
	}, [isOpen])

	// Управление видимостью кнопки прокрутки вниз
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
	}, [messagesState])

	// Load messages from localStorage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedMessages = localStorage.getItem('chatbotMessages')
			if (savedMessages) {
				setMessages(JSON.parse(savedMessages))
				setHasUserSentMessage(true)
			}
		}
	}, [])

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const detectLanguage = (text: string): 'en' | 'uk' => {
		if (text.length < 3) return locale as 'en' | 'uk'
		try {
			const lang = franc(text, { only: ['eng', 'ukr'], minLength: 3 })
			return lang === 'und'
				? (locale as 'en' | 'uk')
				: lang === 'eng'
				? 'en'
				: 'uk'
		} catch (error) {
			console.error('Error detecting language:', error)
			return locale as 'en' | 'uk'
		}
	}

	const handleSend = async () => {
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

		const userLang = detectLanguage(input)
		const tDynamic = createTranslator({
			locale: userLang,
			namespace: 'Chatbot',
			messages: allMessages[userLang] || allMessages[locale] || {},
		})
		let botResponse: string

		const doc = nlp(input.toLowerCase())

		let matchedProject: string | null = null
		for (const [project, keywords] of Object.entries(PROJECT_KEYWORDS)) {
			if (keywords.some(keyword => doc.has(keyword))) {
				matchedProject = project
				break
			}
		}

		if (matchedProject) {
			botResponse = tDynamic(`projects.${matchedProject}`)
		} else if (
			doc.has('experience') ||
			doc.has('досвід') ||
			doc.has('навич') ||
			doc.has('вмін')
		) {
			botResponse = tDynamic('projects.experience')
		} else if (
			doc.has('technolog') ||
			doc.has('технолог') ||
			doc.has('skill') ||
			doc.has('скіл')
		) {
			botResponse = tDynamic('projects.technologies')
		} else {
			const randomIndex = Math.floor(
				Math.random() * tDynamic.raw('unknown')?.length || 0
			)
			botResponse = tDynamic(`unknown.${randomIndex}`)
		}

		const botMessage: Message = {
			id: messagesState.length + 2,
			text: botResponse,
			isBot: true,
		}
		setMessages(prev => [...prev, botMessage])
		setIsTyping(false)
	}

	const handleResize = (
		e: any,
		{ size }: { size: { width: number; height: number } }
	) => {
		setChatSize({ width: size.width, height: size.height })
	}

	return (
		<>
			{/* Кнопка открытия чата */}
			<motion.button
				className={`fixed w-12 h-12 lg:w-16 lg:h-16 bottom-16 z-[1000] bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:text-secondTextColor focus:text-secondTextColor p-3 rounded-full shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 flex items-center justify-center pointer-events-auto ${
					isTabletOrSmaller ? 'top-16 right-6' : 'bottom-6 right-8'
				}`}
				onClick={() => setIsOpen(!isOpen)}
				animate={{ opacity: isChatButtonVisible ? 1 : 0 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				aria-label='Toggle chat'
			>
				<MdOutlineChat className='w-6 h-6' />
			</motion.button>

			{/* Окно чата */}
			<AnimatePresence mode='sync'>
				{isOpen && (
					<motion.div
						className={`fixed z-[1000] pointer-events-auto ${
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
							<div className='fixed inset-0 m-4 md:m-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-lg shadow-xl flex flex-col z-[1000] border border-white/20 overflow-auto pointer-events-auto'>
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
								className={`flex flex-col bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-lg shadow-xl z-[1000] border border-white/20 pointer-events-auto ${
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

const ChatContent: React.FC<ChatContentProps> = ({
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
}) => {
	const tChatbot = useTranslations('Chatbot')
	const tButtons = useTranslations('Buttons')
	return (
		<>
			<div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center'>
				<h3 className='text-lg font-semibold font-montserrat'>
					{tChatbot('title')}
				</h3>
				<div className='flex gap-1'>
					<motion.button
						onClick={() => setIsFullscreen(prev => !prev)}
						className='relative group p-2 rounded-lg hover:bg-white/20 transition-colors duration-300'
						aria-label={isFullscreen ? 'Minimize chat' : 'Maximize chat'}
					>
						<MdOutlineFullscreen className='w-5 h-5' />
						{/* Tooltip */}
						{!isFullscreen && (
							<span className='absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md whitespace-nowrap'>
								{tChatbot('fullScreen')}
							</span>
						)}
					</motion.button>
					<motion.button
						onClick={() => setIsOpen(false)}
						className='relative group p-2 rounded-lg hover:bg-white/20 transition-colors duration-300'
						aria-label='Close chat'
					>
						<AiOutlineClose className='w-5 h-5' />
						{/* Tooltip */}
						{!isFullscreen && (
							<span className='absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md whitespace-nowrap'>
								{tChatbot('close')}
							</span>
						)}
					</motion.button>
				</div>
			</div>
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
			{showScrollButton && (
				<motion.button
					className='absolute group bottom-32 right-4 backdrop-blur-md bg-darkBgColor/70 shadow-lg hover:bg-cardBgColor transition-all duration-300 text-white p-2 rounded-xl hover:shadow-xl'
					onClick={scrollToBottom}
					aria-label='Scroll to bottom'
				>
					<IoChevronDown className='w-5 h-5' />
					{/* Tooltip */}
					{!isFullscreen && (
						<span className='absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md whitespace-nowrap'>
							{tChatbot('scrollToDown')}
						</span>
					)}
				</motion.button>
			)}
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
						{!isFullscreen && (
							<span className='absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md whitespace-nowrap'>
								{tChatbot('send')}
							</span>
						)}
					</motion.button>
				</div>
				<motion.button
					onClick={() => {
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
					}}
					className='backdrop-blur-md bg-darkBgColor/70 shadow-sm hover:bg-cardBgColor transition-colors duration-300 text-white px-3 py-2 rounded-xl  mt-2 font-rubik'
					aria-label='Clear chat'
				>
					{tButtons('clearChat')}
				</motion.button>
			</div>
		</>
	)
}
