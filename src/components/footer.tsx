'use client'

import Link from 'next/link'
import { SocialLinkList } from './ui/social-link-list'
import { ButtonCustom } from './ui/button-custom'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getAddress } from '../data/address.data'

export const Footer = () => {
	const t = useTranslations('Footer')
	const tButtons = useTranslations('Buttons')

	const ADDRESS = getAddress(t)

	const footerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
		},
	}

	const childVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	}

	return (
		<motion.footer
			id='footer'
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={footerVariants}
			className='bg-secondBgColor/90 backdrop-blur-md shadow-custom section-component py-12 md:py-16'
		>
			<div className='custom-container mx-auto px-4'>
				<div className='wrapper grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 items-start'>
					{/* Контакты */}
					<motion.div variants={childVariants} className='space-y-6'>
						<h3 className='font-bold text-xl tracking-tight text-primeColor'>
							{t('title')}
						</h3>
						<address className='not-italic'>
							<ul className='space-y-2'>
								{ADDRESS.map(item => (
									<li key={item.name}>
										{item.name === 'email' ? (
											<Link
												href={item.href}
												target='_blank'
												rel='noopener nofollow noreferrer'
												className='font-semibold text-sm tracking-tight text-secondTextColor hover:text-accentColor transition-colors duration-200'
												aria-label={`Send email to ${item.description}`}
											>
												{item.description}
											</Link>
										) : (
											<Link
												href={item.href}
												className='font-semibold text-sm tracking-tight text-secondTextColor hover:text-accentColor transition-colors duration-200'
												aria-label={item.description}
											>
												{item.description}
											</Link>
										)}
									</li>
								))}
							</ul>
						</address>
					</motion.div>

					{/* Социальные ссылки */}
					<motion.div
						variants={childVariants}
						className='flex justify-end xl:justify-center'
					>
						<SocialLinkList />
					</motion.div>

					{/* Кнопка Get In Touch */}
					<div className='flex max-xl:col-span-2 justify-center xl:justify-end'>
						<ButtonCustom isLink href='#contacts' styles={{ minWidth: 165 }}>
							{tButtons('getInTouch')}
						</ButtonCustom>
					</div>
				</div>

				{/* Копирайт */}
				<motion.div
					variants={childVariants}
					className='mt-12 pt-6 border-t border-gray-200/30 text-center text-sm text-secondTextColor'
				>
					<p>
						&copy; {new Date().getFullYear()} VladZaver.{' '}
						{t('allRightsReserved')}
					</p>
				</motion.div>
			</div>
		</motion.footer>
	)
}
