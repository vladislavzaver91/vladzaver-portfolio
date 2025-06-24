'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export const About = () => {
	const t = useTranslations('About')

	return (
		<div className='wrapper flex flex-col gap-5'>
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='flex max-lg:flex-col gap-5 w-full'
			>
				<h3 className='flex-1 font-extrabold text-3xl lg:text-5xl leading-[1.15] text-primeColor font-montserrat'>
					{t('sectionTitle')}
				</h3>
				<p className='flex-1 font-light text-base lg:text-lg text-secondColor  tracking-extra-tight'>
					{t('description1')}
				</p>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, x: 50 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='flex max-lg:flex-col-reverse gap-5 w-full'
			>
				<div className='flex-1'>
					<p className='mb-4 font-light text-base lg:text-lg text-secondColor tracking-extra-tight'>
						{t('description2')}
					</p>
					<p className='font-light text-base lg:text-lg text-secondColor tracking-extra-tight'>
						{t('description3')}
					</p>
				</div>
				<Link href='/' className='flex-1'>
					<div className='overflow-hidden relative w-full lg:w-[390px] h-[420px] sm:h-[480px] lg:h-[301px] rounded-2xl'>
						<Image
							src='/about/certificate.png'
							alt='certificate'
							fill
							sizes='(max-width: 768px) 100vw, 264px'
							className='object-cover object-center'
						/>
					</div>
				</Link>
			</motion.div>
		</div>
	)
}
