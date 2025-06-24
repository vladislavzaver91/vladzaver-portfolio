'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { TitleCustom } from '../ui/title-custom'
import { getProjects } from './projects.data'
import { ProjectsList } from './projects-list'
import { ProjectItem } from './project-item'

export const ProjectsSection = () => {
	const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

	const t = useTranslations('Projects')

	const PROJECTS = getProjects(t)

	return (
		<div id='projects' className='section-component custom-container'>
			<div className='wrapper'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					<TitleCustom
						mainTitle
						style={{
							background: 'linear-gradient(180deg, #ff8660 0%, #d5491d 100%)',
							backgroundClip: 'text',
						}}
					>
						{t('title')}
					</TitleCustom>
				</motion.div>
				<ProjectsList
					projects={PROJECTS}
					onProjectClick={(id: string) => setActiveProjectId(id)}
				/>
			</div>

			{/* Модальное окно поверх */}
			<AnimatePresence>
				{activeProjectId && (
					<motion.div
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className='bg-secondBgColor overflow-hidden max-w-[1024px] w-full m-4 max-h-[90vh] rounded-2xl shadow-lg'
							layoutId={`project-${activeProjectId}`}
						>
							<ProjectItem
								id={activeProjectId}
								onClose={() => setActiveProjectId(null)}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
