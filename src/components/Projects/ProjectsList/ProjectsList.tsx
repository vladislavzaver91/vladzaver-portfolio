'use client'

import { Link } from '@/i18n/routing'
import { ProjectItems, ProjectsFilter } from '@/types/types'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ProjectsList = ({
	projects,
	filters = { role: '', completionYear: '', type: '', skills: [] },
}: {
	projects: ProjectItems[]
	filters?: ProjectsFilter
}) => {
	const filteredProjects = projects.filter(project => {
		const { role, completionYear, type, skills } = filters

		const matchesSkills = skills.length
			? skills.every(skill => project.skills.some(s => s.name === skill))
			: true

		return (
			(role ? project.role === role : true) &&
			(completionYear ? project.completionYear === completionYear : true) &&
			(type ? project.type === type : true) &&
			matchesSkills
		)
	})

	return (
		<ul className='flex flex-wrap gap-7'>
			{filteredProjects.length > 0 ? (
				filteredProjects.map(project => (
					<motion.li
						key={project.id}
						className='w-[390px]'
						layoutId={`project-${project.id}`}
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
					>
						<Link href={`/projects/${project.id}`} className='group'>
							<div className='relative overflow-hidden'>
								<div className='overflow-hidden relative w-full h-[301px] rounded-2xl'>
									<Image
										src={project.img}
										alt={project.title}
										fill
										sizes='(max-width: 768px) 100vw, 264px'
										className='object-cover object-center'
									/>
								</div>
								<div className='project-about-thumb group-hover:translate-y-0 group-focus:translate-y-0'>
									<h3 className='mt-1 font-montserrat font-semibold text-lg uppercase'>
										{project.title}
									</h3>
								</div>
							</div>
						</Link>
					</motion.li>
				))
			) : (
				<p>No projects found</p>
			)}
		</ul>
	)
}

export default ProjectsList
