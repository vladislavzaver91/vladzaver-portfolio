'use client'

import { PROJECTS } from '@/components/Projects/projects.data'
import useCloseModal from '@/hooks/useCloseModal'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import Image from 'next/image'
import Link from 'next/link'

const ProjectItemPage = ({
	id,
	onClose,
}: {
	id: string
	onClose: () => void
}) => {
	useLockBodyScroll()
	const project = PROJECTS.find(p => p.id === id)

	const { modalRef } = useCloseModal({
		onClose,
	})

	if (!project) {
		return <p>Project not found</p>
	}

	return (
		<div
			ref={modalRef}
			className='bg-secondBgColor overflow-auto max-w-[1024px] w-full m-4 max-h-[90vh] rounded-2xl shadow-lg'
		>
			<div className='relative'>
				<div className='overflow-hidden relative w-full h-[460px]'>
					<Image
						src={project.img}
						alt={project.title}
						fill
						className='object-cover object-top'
					/>
				</div>
				<div className='grid grid-cols-2 gap-6 p-12 max-lg:grid-cols-1'>
					<div>
						<h3 className='text-xl font-bold uppercase tracking-widest text-primeColor mb-6'>
							{project.title}
						</h3>
						<p className='text-secondColor tracking-widest font-normal text-xl mb-6'>
							{project.descr}
						</p>
						<p className='text-secondColor tracking-widest font-normal text-xl mb-6'>
							Role: {project.role}
						</p>
						<p className='text-secondColor tracking-widest font-normal text-xl'>
							Year of completion: {project.completionYear}
						</p>
					</div>
					<div>
						<p className='text-secondColor tracking-widest font-normal text-xl mb-6'>
							Type of project: {project.type}
						</p>
						<div className='mb-6 flex flex-wrap gap-2 w-full'>
							{project.skills.map(skill => (
								<div
									key={skill.name}
									className='flex items-center rounded-xl py-1 px-3 bg-cardBgColor'
								>
									<img
										src={skill.icon}
										alt={skill.name}
										className='w-5 h-5 mr-2'
									/>
									{skill.name}
								</div>
							))}
						</div>
						<div className='flex flex-col gap-4'>
							<Link
								href={project.gitHubUrl}
								target='_blank'
								rel='noopener nofollow noreferrer'
								className='font-bold text-2xl tracking-extra-tight text-secondTextColor not-italic link-hover'
							>
								View code
							</Link>
							<Link
								href={project.projectUrl}
								target='_blank'
								rel='noopener nofollow noreferrer'
								className='font-bold text-2xl tracking-extra-tight text-secondTextColor not-italic link-hover'
							>
								Open the project
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectItemPage
