import { AnimatePresence } from 'framer-motion'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Montserrat_Alternates, Rubik } from 'next/font/google'
import { notFound } from 'next/navigation'
import './globals.css'
import { routing } from '../../i18n/routing'
import { Header } from '../../components/header'
import { StructuredData } from '../../components/structured-data'
import { Footer } from '../../components/footer'

const montserrat = Montserrat_Alternates({
	weight: ['600', '800'],
	subsets: ['latin', 'cyrillic'],
})

const rubik = Rubik({
	weight: ['300', '400', '600', '700'],
	subsets: ['latin', 'cyrillic'],
})

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	let messages
	try {
		messages = (await import(`../../messages/${locale}.json`)).default
	} catch (error) {
		notFound()
	}

	const title =
		messages.Metadata?.title || 'VladZaver Portfolio / Full-stack Developer'
	const description =
		messages.Metadata?.description ||
		'Explore the portfolio of VladZaver, a full-stack developer skilled in Next.js, React, and modern web technologies.'

	return {
		title,
		description,
		keywords: [
			'front-end developer',
			'frontend developer',
			'full-stack developer',
			'fullstack developer',
			'junior',
			'web developer',
			'portfolio',
			'Next.js',
			'React',
			'JavaScript',
			'VladZaver',
		],
		authors: [{ name: 'VladZaver' }],
		openGraph: {
			title,
			description,
			url: `https://yourdomain.com/${locale}`,
			siteName: 'VladZaver Portfolio',
			images: [
				{
					url: '/og-image.jpg',
					width: 1200,
					height: 630,
					alt: 'VladZaver Portfolio Preview',
				},
			],
			locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['/og-image.jpg'],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		alternates: {
			canonical: `https://yourdomain.com/${locale}`,
			languages: {
				en: 'https://yourdomain.com/en',
				uk: 'https://yourdomain.com/uk',
			},
		},
	}
}

interface RootLayoutProps {
	children: React.ReactNode
	params: Promise<{
		locale: string
	}>
}

export default async function RootLayout({
	children,
	params,
}: RootLayoutProps) {
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	let messages
	try {
		messages = (await import(`../../messages/${locale}.json`)).default
	} catch (error) {
		notFound()
	}

	return (
		<html lang={locale}>
			<head>
				<link rel='icon' href='/favicon.svg' />
				<StructuredData />
			</head>
			<body className={`${montserrat.className} ${rubik.className}`}>
				<NextIntlClientProvider messages={messages}>
					<AnimatePresence mode='wait' initial={false}>
						<Header />
						{children}
						<Footer />
					</AnimatePresence>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
