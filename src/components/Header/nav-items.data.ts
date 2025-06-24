'use client'

import { NavItems } from '@/types/types'
import { useTranslations } from 'next-intl'
import {
	AiFillHome,
	AiFillProject,
	AiFillInfoCircle,
	AiFillPhone,
} from 'react-icons/ai'
import { MdWorkHistory } from 'react-icons/md'

export const getNavigation = (
	t: ReturnType<typeof useTranslations>
): NavItems[] => [
	{ name: t('home'), link: 'home', icon: AiFillHome },
	{ name: t('about'), link: 'about', icon: AiFillInfoCircle },
	{ name: t('projects'), link: 'projects', icon: AiFillProject },
	{ name: t('experience'), link: 'experience', icon: MdWorkHistory },
	{ name: t('contacts'), link: 'contacts', icon: AiFillPhone },
]
