import { NavItems } from '@/types/types'
import {
	AiFillHome,
	AiFillProject,
	AiFillInfoCircle,
	AiFillPhone,
} from 'react-icons/ai'
import { MdWorkHistory } from 'react-icons/md'

export const NAV_ITEMS: NavItems[] = [
	{ name: 'Home', link: 'home', icon: AiFillHome },
	{ name: 'About', link: 'about', icon: AiFillInfoCircle },
	{ name: 'Projects', link: 'projects', icon: AiFillProject },
	{ name: 'Experience', link: 'experience', icon: MdWorkHistory },
	{ name: 'Contacts', link: 'contacts', icon: AiFillPhone },
]
