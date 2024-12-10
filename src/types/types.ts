export type SkillIcons = {
	src: string
	name: string
}

export type SocialLinks = {
	src: string
	href: string
	name: string
}

export type AddressProps = {
	href: string
	descr: string
	name: string
}

export type ExperienceItems = {
	title: string
	descr: string
	period: string
}

export type ProjectItems = {
	id: string
	title: string
	descr: string
	gitHubUrl: string
	projectUrl: string
	img: string
	skills: Skill[]
	role: string
	completionYear: string
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
