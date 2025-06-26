'use client'

import { useTranslations } from 'next-intl'
import {
	AiOutlineHome,
	AiOutlineProject,
	AiOutlineInfoCircle,
	AiOutlinePhone,
} from 'react-icons/ai'
import { MdOutlineWorkHistory } from 'react-icons/md'
import { NavItems } from '../types/types'

export const getNavigation = (
	t: ReturnType<typeof useTranslations>
): NavItems[] => [
	{ name: t('home'), link: 'home', icon: AiOutlineHome },
	{ name: t('about'), link: 'about', icon: AiOutlineInfoCircle },
	{ name: t('projects'), link: 'projects', icon: AiOutlineProject },
	{ name: t('experience'), link: 'experience', icon: MdOutlineWorkHistory },
	{ name: t('contacts'), link: 'contacts', icon: AiOutlinePhone },
]
