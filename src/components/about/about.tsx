'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const About = () => {
	return (
		<div className='wrapper flex flex-col gap-5'>
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='flex max-lg:flex-col gap-5 w-full'
			>
				<h3 className='flex-1 font-extrabold text-3xl lg:text-5xl leading-[1.15] text-primeColor font-montserrat'>
					I write code because I love it.
				</h3>
				<p className='flex-1 font-light text-base lg:text-lg text-secondColor  tracking-extra-tight'>
					My name is Vladislav. I am a Junior Fullstack Developer with
					commercial experience in freelance teams, where I contributed to
					real-world projects such as CRMs, marketplaces, e-commerce platforms,
					AI-powered Telegram apps, and adaptive landing pages. I write code
					because it allows me to combine creativity, logic, and attention to
					detail to solve real problems. Graduating from GoIT Academy's
					Fullstack Development program laid my technical foundation. Today, I
					continue to grow as a developer who enjoys solving challenges and
					contributing to meaningful projects.
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
						It is important for me to create clean and user-friendly code with
						attention to detail. In the process, I always strive to find the
						most effective solutions and remain open to new ideas. I'm sociable,
						easy to get along with the team, and I don't stop learning - in my
						free time I improve my skills and experiment with new technologies.
					</p>
					<p className='font-light text-base lg:text-lg text-secondColor tracking-extra-tight'>
						I write code because it gives me pleasure and opens up new
						opportunities. I want to develop as a front-end developer and am
						constantly working on my professional growth.
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
