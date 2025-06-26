'use client'

import { useTranslations } from 'next-intl'
import { ExperienceItems } from '../types/types'

export const getExperience = (
	t: ReturnType<typeof useTranslations>
): ExperienceItems[] => [
	{
		title: t('freelance.title'),
		description: t('freelance.description'),
		period: t('freelance.period'),
	},
	{
		title: t('auditor.title'),
		description: t('auditor.description'),
		period: t('auditor.period'),
	},
]
