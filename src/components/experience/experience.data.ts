'use client'

import { ExperienceItems } from '@/types/types'
import { useTranslations } from 'next-intl'

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
