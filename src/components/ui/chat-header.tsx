'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AiOutlineClose } from 'react-icons/ai'
import { MdOutlineFullscreen } from 'react-icons/md'
import { useTranslations } from 'next-intl'
import { Tooltip } from './tooltip'

interface ChatHeaderProps {
	isFullscreen: boolean
	setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChatHeader = ({
	isFullscreen,
	setIsFullscreen,
	setIsOpen,
}: ChatHeaderProps) => {
	const tChatbot = useTranslations('Chatbot')

	return (
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
					{!isFullscreen && <Tooltip>{tChatbot('fullScreen')}</Tooltip>}
				</motion.button>
				<motion.button
					onClick={() => setIsOpen(false)}
					className='relative group p-2 rounded-lg hover:bg-white/20 transition-colors duration-300'
					aria-label='Close chat'
				>
					<AiOutlineClose className='w-5 h-5' />
					{/* Tooltip */}
					{!isFullscreen && <Tooltip>{tChatbot('close')}</Tooltip>}
				</motion.button>
			</div>
		</div>
	)
}
