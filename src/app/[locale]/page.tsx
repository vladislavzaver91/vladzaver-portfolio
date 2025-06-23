'use client'

import { AboutSection } from '@/components/about/about-section'
import { ContactsSection } from '@/components/contacts/contacts-section'
import { Experience } from '@/components/experience/experience'
import { Hero } from '@/components/hero/hero'
import { Projects } from '@/components/projects/projects'
import { Skills } from '@/components/skills/skills'
import { MobileSectionNav } from '@/components/ui/mobile-section-nav'

export default function Home() {
	return (
		<div id='home' className='section'>
			<Hero />
			<AboutSection />
			<Skills />
			<Projects />
			<Experience />
			<ContactsSection />
			<MobileSectionNav />
		</div>
	)
}
