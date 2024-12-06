// import { useTranslations } from 'next-intl'

// export default function HomePage() {
// 	const t = useTranslations('HomePage')
// 	return (
// 		<div>
// 			<h1>{t('title')}</h1>
// 		</div>
// 	)
// }

import Experience from '@/components/Main/Experience/Experience'
import Hero from '@/components/Main/Hero/Hero'
import ProjectsPreview from '@/components/Main/ProjectsPreview/ProjectsPreview'
import Skills from '@/components/Main/Skills/Skills'

export default function Home() {
	return (
		<div className='section'>
			<Hero />
			<Skills />
			<ProjectsPreview />
			<Experience />
		</div>
	)
}
