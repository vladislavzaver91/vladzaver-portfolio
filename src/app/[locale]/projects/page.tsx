'use client'

import ProjectItemPage from '@/components/Projects/ProjectItem/ProjectItem'
import { PROJECTS } from '@/components/Projects/projects.data'
import ProjectsList from '@/components/Projects/ProjectsList/ProjectsList'
import ProjectsFilter from '@/components/ProjectsFilter/ProjectsFilter'
import Title from '@/components/Title/Title'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function Projects() {
	const t = useTranslations('Projects')

	// Фильтры для списка
	const [filters, setFilters] = useState({
		role: '',
		completionYear: '',
		type: '',
		skills: [],
	})

	// Текущий активный проект (для отображения оверлея)
	const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

	const handleFilterChange = (updatedFilters: typeof filters) => {
		setFilters(updatedFilters)
	}

	return (
		<div className='section'>
			<div
				className={`container relative transition-filter duration-300 ${
					activeProjectId ? 'blur-sm' : ''
				}`}
			>
				<Title
					style={{
						background: 'linear-gradient(138deg, #ff8660 0%, #8000ff 98.96%)',
						backgroundClip: 'text',
					}}
				>
					{t('MyProjects')}
				</Title>
				<ProjectsFilter onFilterChange={handleFilterChange} />
				<ProjectsList
					projects={PROJECTS}
					filters={filters}
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
						<ProjectItemPage
							id={activeProjectId}
							onClose={() => setActiveProjectId(null)}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
