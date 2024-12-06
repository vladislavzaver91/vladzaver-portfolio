import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Montserrat_Alternates, Rubik } from 'next/font/google'
import { notFound } from 'next/navigation'
import './globals.css'

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
	params: {
		locale: string
	}
}

export default async function RootLayout({
	children,
	params: { locale },
}: RootLayoutProps) {
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body className={`${montserrat.className} ${rubik.className}`}>
				<NextIntlClientProvider messages={messages}>
					<Header />
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
