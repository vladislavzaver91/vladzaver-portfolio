import { FaTelegramPlane, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { SocialLinks } from '../types/types'

export const SOCIAL_LINKS: SocialLinks[] = [
	{
		icon: FaTelegramPlane,
		href: 'https://t.me/VladislavZaver',
		name: 'Telegram',
	},
	{
		icon: FaLinkedinIn,
		href: 'https://www.linkedin.com/in/vladislav-zavertaylo-480626264/',
		name: 'Linkedin',
	},
	{
		icon: FaGithub,
		href: 'https://github.com/vladislavzaver91?tab=repositories',
		name: 'GitHub',
	},
]
