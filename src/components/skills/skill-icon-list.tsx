'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SKILL_ICONS } from './skills.data'

export const SkillIconList = () => {
	return (
		<motion.ul
			initial='hidden'
			animate='visible'
			variants={{
				hidden: { opacity: 0 },
				visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
			}}
			className='grid grid-cols-2 min-[420px]:grid-cols-3 lg:grid-cols-4 gap-5'
		>
			{SKILL_ICONS.map((icon, index) => {
				// вычисляем для последних двух элементов
				const isSecondLast = index === SKILL_ICONS.length - 2
				const isLast = index === SKILL_ICONS.length - 1

				return (
					<motion.li
						key={index}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
						className={`p-3 h-full flex flex-col items-center justify-between group hover:shadow-lg transition-shadow bg-cardBgColor border border-transparent rounded-lg
              ${
								isSecondLast
									? 'lg:col-start-2'
									: isLast
									? 'min-[420px]:col-start-2 lg:col-start-3'
									: ''
							}`}
					>
						<div className='relative'>
							<Image
								src={icon.src}
								alt={icon.name}
								width={44}
								height={44}
								className='filter grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition duration-300 mb-4 min-w-11 min-h-11'
							/>
						</div>
						<p className='font-normal text-secondTextColor text-center text-sm'>
							{icon.name}
						</p>
					</motion.li>
				)
			})}
		</motion.ul>
	)
}
