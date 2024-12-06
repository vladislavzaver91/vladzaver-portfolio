import Button from '@/components/Button/Button';
import { PROJECTS } from '@/components/Projects/projects.data';
import ProjectsList from '@/components/Projects/ProjectsList/ProjectsList';
import Title from '@/components/Title/Title';

const ProjectsPreview = () => {
	const projectsPreview = PROJECTS.slice(0, 4);

	return (
		<div className="section-component container">
			<div className="wrapper">
				<Title
					style={{
						background: 'linear-gradient(180deg, #ff8660 0%, #d5491d 100%)',
						backgroundClip: 'text',
						marginBottom: 25,
					}}
				>
					Projects
				</Title>
				<ProjectsList projects={projectsPreview} />
				<div className="flex justify-center gap-5 mt-12">
					<Button isLink href="/projects">
						All Projects
					</Button>
					<Button isLink href="/contact">
						Get In Touch
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProjectsPreview;
