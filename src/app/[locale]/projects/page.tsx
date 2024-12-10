'use client'

import { PROJECTS } from '@/components/Projects/projects.data'
import ProjectsList from '@/components/Projects/ProjectsList/ProjectsList'
import ProjectsFilter from '@/components/ProjectsFilter/ProjectsFilter'
import Title from '@/components/Title/Title'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function Projects() {
	const t = useTranslations('Projects')
	const [filters, setFilters] = useState({
		role: '',
		completionYear: '',
		type: '',
		skills: [],
	})

	const handleFilterChange = (updatedFilters: typeof filters) => {
		setFilters(updatedFilters)
	}
	return (
		<div className='section'>
			<div className='container'>
				<Title
					style={{
						background: 'linear-gradient(138deg, #ff8660 0%, #8000ff 98.96%)',
						backgroundClip: 'text',
					}}
				>
					{t('MyProjects')}
				</Title>
				<ProjectsFilter onFilterChange={handleFilterChange} />
				<ProjectsList projects={PROJECTS} filters={filters} />
			</div>
		</div>
	)
}
