import { IconType } from 'react-icons/lib'

export type NavItems = {
	name: string
	link: string
	icon: IconType
}

export type SkillIcons = {
	src: string
	name: string
}

export type SocialLinks = {
	icon: IconType
	href: string
	name: string
}

export type AddressProps = {
	href: string
	description: string
	name: string
}

export type ExperienceItems = {
	title: string
	description: string
	period: string
}

export type ProjectItems = {
	id: string
	title: string
	description: string
	mainImage: string
	images: string[]
	skills: Skill[]
	role: string
	period: string
	type: string
}

export type Skill = {
	name: string
	icon: string
}

export type ProjectsFilter = {
	role: string
	completionYear: string
	type: string
	skills: string[]
}

export type LanguageOption = {
	code: string
	name: string
	flag: string
}

export type Message = {
	id: number
	text: string
	isBot: boolean
}

export type ProjectKeywords = {
	[key: string]: string[]
}
