'use client'

import { ProjectItems } from '@/types/types'
import { useTranslations } from 'next-intl'

export const getProjects = (
	t: ReturnType<typeof useTranslations>
): ProjectItems[] => [
	{
		id: 'go-peei',
		title: t('ngo.title'),
		description: t('ngo.description'),

		mainImage: '/projects/gopeei-1.png',
		images: [
			'/projects/gopeei.png',
			'/projects/gopeei-2.png',
			'/projects/gopeei-3.png',
		],
		skills: [
			{
				name: 'Next.js',
				icon: '/skill-icons/Next.svg',
			},
			{
				name: 'Sass',
				icon: '/skill-icons/Sass.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
			{
				name: 'MongoDB',
				icon: '/skill-icons/MongoDB.svg',
			},
		],
		role: t('ngo.role'),
		period: t('ngo.period'),
		type: t('ngo.type'),
	},
	{
		id: 'classifieds-marketplace',
		title: t('marketplace.title'),
		description: t('marketplace.description'),

		mainImage: '/projects/classifieds-marketplace-1.png',
		images: [
			'/projects/classifieds-marketplace.png',
			'/projects/classifieds-marketplace-2.png',
			'/projects/classifieds-marketplace-3.png',
		],
		skills: [
			{
				name: 'Next.js',
				icon: '/skill-icons/Next.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
			{
				name: 'Node',
				icon: '/skill-icons/Node.svg',
			},
			{
				name: 'Express',
				icon: '/skill-icons/Express.svg',
			},
			{
				name: 'Prisma',
				icon: '/skill-icons/prisma.svg',
			},
			{
				name: 'Supabase',
				icon: '/skill-icons/supabase.svg',
			},
			{
				name: 'Axios',
				icon: '/skill-icons/Axios.svg',
			},
		],
		role: t('marketplace.role'),
		period: t('marketplace.period'),
		type: t('marketplace.type'),
	},
	{
		id: 'luxury-car-interior',
		title: t('luxuryCar.title'),
		description: t('luxuryCar.description'),

		mainImage: '/projects/luxury-car-interior-1.png',
		images: [
			'/projects/luxury-car-interior.png',
			'/projects/luxury-car-interior-2.png',
			'/projects/luxury-car-interior-3.png',
		],
		skills: [
			{
				name: 'Vue3',
				icon: '/skill-icons/Vue.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'Axios',
				icon: '/skill-icons/Axios.svg',
			},
			{
				name: 'Pinia',
				icon: '/skill-icons/Pinia.svg',
			},
		],
		role: t('luxuryCar.role'),
		period: t('luxuryCar.period'),
		type: t('luxuryCar.type'),
	},
	{
		id: 'ai-powered-nutrition-assistant',
		title: t('telegramApp.title'),
		description: t('telegramApp.description'),

		mainImage: '/projects/ai-nutrition-2.png',
		images: [
			'/projects/ai-nutrition-1.png',
			'/projects/ai-nutrition.png',
			'/projects/ai-nutrition-3.png',
		],
		skills: [
			{
				name: 'React.js',
				icon: '/skill-icons/React.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
			{
				name: 'Node',
				icon: '/skill-icons/Node.svg',
			},
			{
				name: 'Express',
				icon: '/skill-icons/Express.svg',
			},
			{
				name: 'Prisma',
				icon: '/skill-icons/prisma.svg',
			},
			{
				name: 'Supabase',
				icon: '/skill-icons/supabase.svg',
			},
			{
				name: 'Axios',
				icon: '/skill-icons/Axios.svg',
			},
		],
		role: t('telegramApp.role'),
		period: t('telegramApp.period'),
		type: t('telegramApp.type'),
	},
	{
		id: 'crm-water-delivery',
		title: t('crm.title'),
		description: t('crm.description'),

		mainImage: '/projects/crm-main.png',
		images: [
			'/projects/crm-1.png',
			'/projects/crm-2.png',
			'/projects/crm-3.png',
		],
		skills: [
			{
				name: 'React.js',
				icon: '/skill-icons/React.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
			{
				name: 'Axios',
				icon: '/skill-icons/Axios.svg',
			},
		],
		role: t('crm.role'),
		period: t('crm.period'),
		type: t('crm.type'),
	},
	{
		id: 'kinesiology-school',
		title: t('landing.title'),
		description: t('landing.description'),

		mainImage: '/projects/kinesiology-school-2.png',
		images: [
			'/projects/kinesiology-school-1.png',
			'/projects/kinesiology-school-3.png',
			'/projects/kinesiology-school.png',
		],
		skills: [
			{
				name: 'React.js',
				icon: '/skill-icons/React.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
		],
		role: t('landing.role'),
		period: t('landing.period'),
		type: t('landing.type'),
	},
]
