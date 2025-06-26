'use client'

import Link from 'next/link'
import { SOCIAL_LINKS } from '../../data/social-links.data'
import { motion } from 'framer-motion'

export const SocialLinkList = () => {
	const itemVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
	}

	return (
		<ul className='flex justify-center gap-3'>
			{SOCIAL_LINKS.map(item => (
				<motion.li
					key={item.name}
					variants={itemVariants}
					className='relative group'
					whileTap={{ scale: 0.95 }}
				>
					<Link
						href={item.href}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center w-10 h-10 rounded-xl bg-darkBgColor text-white hover:bg-cardBgColor transition-colors duration-300 group'
						aria-label={`Visit ${item.name}`}
					>
						<item.icon className='w-6 h-6 group-hover:text-accentColor transition-colors duration-300' />
					</Link>
					{/* Tooltip */}
					<span className='absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md whitespace-nowrap'>
						{item.name}
					</span>
				</motion.li>
			))}
		</ul>
	)
}
