'use client'

import ProjectItem from '@/components/Projects/ProjectItem/ProjectItem'
import { PROJECTS } from '@/components/Projects/projects.data'
import { useParams } from 'next/navigation'

export default function ProjectPage() {
	const { id } = useParams()
	const project = PROJECTS.find(p => p.id === id)

	if (!project) {
		return <div>Project not found</div>
	}

	return (
		<div className='section'>
			<div className='container'>
				<ProjectItem project={project} />
			</div>
		</div>
	)
}
