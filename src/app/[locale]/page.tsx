'use client'

import dynamic from 'next/dynamic'
import { MobileScrollProgressNav } from '../../components/ui/mobile-scroll-progress-nav'
import Hero from '../../components/hero'
import AboutSection from '../../components/about-section'
import SkillsSection from '../../components/skills-section'
import { BotAssistant } from '../../components/ui/bot-assistant'

const ProjectsSection = dynamic(
	() => import('../../components/projects-section'),
	{ ssr: false }
)
const ExperienceSection = dynamic(
	() => import('../../components/experience-section'),
	{ ssr: false }
)
const ContactsSection = dynamic(
	() => import('../../components/contacts-section'),
	{ ssr: false }
)

export default function Home() {
	return (
		<main
			id='home'
			className='flex-1 overflow-x-hidden section'
			aria-labelledby='hero-heading'
		>
			<h1 id='about-heading' className='sr-only'>
				VladZaver
			</h1>
			<Hero />
			<section id='about' aria-labelledby='about-heading'>
				<h2 id='about-heading' className='sr-only'>
					About VladZaver
				</h2>
				<AboutSection />
				<SkillsSection />
			</section>
			<section id='projects' aria-labelledby='projects-heading'>
				<h2 id='projects-heading' className='sr-only'>
					Projects
				</h2>
				<ProjectsSection />
			</section>
			<section id='experience' aria-labelledby='experience-heading'>
				<h2 id='experience-heading' className='sr-only'>
					Experience
				</h2>
				<ExperienceSection />
			</section>
			<section id='contacts' aria-labelledby='contacts-heading'>
				<h2 id='contacts-heading' className='sr-only'>
					Contact Me
				</h2>
				<ContactsSection />
			</section>

			<MobileScrollProgressNav />
			<BotAssistant />
		</main>
	)
}
