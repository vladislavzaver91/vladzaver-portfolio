'use client'

import { AddressProps } from '@/types/types'
import { useTranslations } from 'next-intl'

export const getAddress = (
	t: ReturnType<typeof useTranslations>
): AddressProps[] => [
	{
		href: 'https://maps.app.goo.gl/PDfd3Aqx29FAma658',
		description: t('contacts.place'),
		name: 'location',
	},
	{
		href: 'mailto:vladislavzaver91@gmail.com',
		description: t('contacts.email'),
		name: 'email',
	},
	{
		href: 'tel:+380951546145',
		description: '+38 095 154 61 45',
		name: 'phone',
	},
]
