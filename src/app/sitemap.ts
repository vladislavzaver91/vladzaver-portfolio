import { MetadataRoute } from 'next'
import { routing } from '../i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://yourdomain.com'
	const locales = routing.locales

	const pages = locales.map(locale => ({
		url: `${baseUrl}/${locale}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 1,
	}))

	return [...pages]
}
