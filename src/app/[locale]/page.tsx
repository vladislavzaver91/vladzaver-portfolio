'use client'

import { AboutSection } from '../../components/about/about-section'
import { ContactsSection } from '../../components/contacts/contacts-section'
import { Experience } from '../../components/experience/experience'
import { Hero } from '../../components/hero/hero'
import { ProjectsSection } from '../../components/Projects/ProjectsSection'
import { Skills } from '../../components/skills/skills'
import { MobileScrollProgressNav } from '../../components/ui/mobile-scroll-progress-nav'

export default function Home() {
	return (
		<div id='home' className='flex-1 overflow-x-hidden section'>
			<Hero />
			<section id='about'>
				<AboutSection />
				<Skills />
			</section>
			<section id='projects'>
				<ProjectsSection />
			</section>
			<section id='experience'>
				<Experience />
			</section>
			<section id='contacts'>
				<ContactsSection />
			</section>

			<MobileScrollProgressNav />
		</div>
	)
}
