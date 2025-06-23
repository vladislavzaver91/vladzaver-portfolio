'use client'

import { ProjectItems } from '@/types/types'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const ProjectsList = ({
	projects,
	onProjectClick,
}: {
	projects: ProjectItems[]
	onProjectClick: (id: string) => void
}) => {
	return (
		<motion.ul
			initial='hidden'
			animate='visible'
			variants={{
				hidden: { opacity: 0 },
				visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
			}}
			className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7'
		>
			{projects.length > 0 ? (
				projects.map((project, index) => (
					<motion.li
						key={project.id}
						onClick={() => onProjectClick(project.id)}
						className='max-w-[390px] min-w-full cursor-pointer'
						layoutId={`project-${project.id}`}
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
					>
						<div className='group'>
							<div className='relative overflow-hidden'>
								<div className='overflow-hidden relative w-full h-[340px] md:h-[301px] rounded-2xl'>
									<Image
										src={project.mainImage}
										alt={project.title}
										fill
										sizes='(max-width: 768px) 100vw, 264px'
										className='object-cover object-center'
									/>
								</div>

								<div className='hidden lg:block project-about-thumb group-hover:translate-y-0 group-focus:translate-y-0'>
									<h3 className='mt-1 font-montserrat font-semibold text-lg uppercase line-clamp-2'>
										{project.title}
									</h3>
								</div>
								<div className='lg:hidden flex justify-between items-center absolute bottom-0 py-2.5 px-6 w-full h-20 rounded-b-2xl bg-gray-800 bg-opacity-80'>
									<h3 className='mt-1 font-montserrat font-semibold text-lg uppercase line-clamp-2'>
										{project.title}
									</h3>
								</div>
							</div>
						</div>
					</motion.li>
				))
			) : (
				<p>No projects found</p>
			)}
		</motion.ul>
	)
}
