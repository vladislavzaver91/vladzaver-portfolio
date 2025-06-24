import { AnimatePresence } from 'framer-motion'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Montserrat_Alternates, Rubik } from 'next/font/google'
import { notFound } from 'next/navigation'
import './globals.css'
import { routing } from '../../i18n/routing'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'

const montserrat = Montserrat_Alternates({
	weight: ['600', '800'],
	subsets: ['latin', 'cyrillic'],
})

const rubik = Rubik({
	weight: ['300', '400', '600', '700'],
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: 'VladZaver Portfolio',
	description: 'Frontend developer`s portfolio',
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
