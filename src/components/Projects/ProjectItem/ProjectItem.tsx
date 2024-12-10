import { ProjectItems } from '@/types/types'
import Image from 'next/image'

export default function ProjectItem({ project }: { project: ProjectItems }) {
	return (
		<>
			<h2 className='text-xl font-bold'>{project.title}</h2>
			<Image src={project.img} alt={project.title} width={600} height={400} />
			<p>{project.descr}</p>
		</>
	)
}
