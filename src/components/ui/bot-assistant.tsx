'use client'

import { franc } from 'franc'
import nlp from 'compromise'
import {
	createTranslator,
	useLocale,
	useMessages,
	useTranslations,
} from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { Message } from '../../types/types'
import { AnimatePresence, motion } from 'framer-motion'

export const BotAssistant = () => {
	const locale = useLocale() // Get current site locale
	const [messagesState, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [allMessages, setAllMessages] = useState<{ [key: string]: any }>({})
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// Load translations for all locales
	useEffect(() => {
		const loadTranslations = async () => {
			try {
				const enMessages = (await import('../../messages/en.json')).default
				const ukMessages = (await import('../../messages/uk.json')).default
				setAllMessages({ en: enMessages, uk: ukMessages })

				// Initialize messages with greeting in current locale
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

	// Load messages from localStorage on client-side mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedMessages = localStorage.getItem('chatbotMessages')
			if (savedMessages) {
				setMessages(JSON.parse(savedMessages))
			}
		}
	}, [])

	// Save messages to localStorage whenever they change
	useEffect(() => {
		if (typeof window !== 'undefined' && messagesState.length > 0) {
			localStorage.setItem('chatbotMessages', JSON.stringify(messagesState))
		}
		scrollToBottom()
	}, [messagesState])

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const detectLanguage = (text: string): 'en' | 'uk' => {
		if (text.length < 3) {
			return locale as 'en' | 'uk' // Fallback to site locale for short texts
		}
		try {
			const lang = franc(text, { only: ['eng', 'ukr'], minLength: 3 })
			if (lang === 'und') {
				return locale as 'en' | 'uk' // Fallback to site locale if undetermined
			}
			return lang === 'eng' ? 'en' : 'uk'
		} catch (error) {
			console.error('Error detecting language:', error)
			return locale as 'en' | 'uk' // Fallback to site locale
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
		setInput('')
		setIsTyping(true)

		// Simulate typing delay
		await new Promise(resolve => setTimeout(resolve, 1000))

		const userLang = detectLanguage(input)
		// Create a translator for the detected language
		const tDynamic = createTranslator({
			locale: userLang,
			namespace: 'Chatbot',
			messages: allMessages[userLang] || allMessages[locale] || {},
		})
		let botResponse: string

		// Use compromise to analyze input
		const doc = nlp(input.toLowerCase())
		const projectKeywords = {
			ngo: ['ngo', 'environmental', 'protection', 'ecology'],
			marketplace: ['marketplace', 'auction', 'classifieds'],
			luxuryCar: ['luxury', 'car', 'interior', 'e-commerce'],
			telegramApp: ['telegram', 'nutrition', 'ai', 'assistant'],
			crm: ['crm', 'water', 'delivery', 'vending'],
			landing: ['landing', 'kinesiology', 'school'],
		}

		// Check for project-related questions
		let matchedProject: string | null = null
		for (const [project, keywords] of Object.entries(projectKeywords)) {
			if (keywords.some(keyword => doc.has(keyword))) {
				matchedProject = project
				break
			}
		}

		if (matchedProject) {
			botResponse = tDynamic(`projects.${matchedProject}`)
		} else if (doc.has('experience') || doc.has('досвід')) {
			botResponse = tDynamic('projects.experience')
		} else if (doc.has('technolog') || doc.has('технолог')) {
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

	return (
		<>
			{/* Chatbot Button */}
			<motion.button
				className='fixed w-16 h-16 top-16 right-4 md:bottom-8 md:right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center'
				onClick={() => setIsOpen(!isOpen)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<svg
					className='w-6 h-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
					/>
				</svg>
			</motion.button>

			{/* Chatbot Window */}
			<AnimatePresence mode='sync'>
				{isOpen && (
					<motion.div
						className='fixed top-28 right-4 md:bottom-24 md:right-8 w-80 h-96 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-lg shadow-xl flex flex-col z-50 border border-white/20'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
					>
						{/* Header */}
						<div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg'>
							<h3 className='text-lg font-semibold font-montserrat'>
								Portfolio Assistant
							</h3>
						</div>

						{/* Messages */}
						<div className='flex-1 p-4 overflow-y-auto'>
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
													? 'bg-white/20 dark:bg-black/20 backdrop-blur-md text-gray-800 dark:text-gray-200'
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
										<div className='bg-white/20 dark:bg-black/20 backdrop-blur-md text-gray-800 dark:text-gray-200 p-3 rounded-lg animate-pulse font-rubik'>
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

						{/* Input */}
						<div className='p-4 border-t border-white/20'>
							<div className='flex gap-2'>
								<input
									type='text'
									value={input}
									onChange={e => setInput(e.target.value)}
									onKeyPress={e => e.key === 'Enter' && handleSend()}
									className='flex-1 p-2 bg-white/10 dark:bg-black/10 backdrop-blur-md text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-rubik'
									placeholder={createTranslator({
										locale,
										namespace: 'Chatbot',
										messages: allMessages[locale] || {},
									})('greeting')}
								/>
								<motion.button
									onClick={handleSend}
									className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-rubik'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Send
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
								}}
								className='bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 mt-2 font-rubik'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Clear Chat
							</motion.button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
