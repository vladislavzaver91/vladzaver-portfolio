'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useTransition } from 'react'

const LanguageSwitcher = () => {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const pathname = usePathname()
	const localActive = useLocale()

	const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const nextLocal = e.target.value
		startTransition(() => {
			const newPath = `/${nextLocal}${pathname.replace(`/${localActive}`, '')}`
			router.replace(newPath)
		})
	}
	return (
		<label className='border-2 rounded'>
			<p className='sr-only'>Change Language</p>
			<select
				defaultValue={localActive}
				onChange={onSelectChange}
				disabled={isPending}
				className='bg-transparent py-2'
			>
				<option value='en'>English</option>
				<option value='uk'>Ukraine</option>
			</select>
		</label>
	)
}

export default LanguageSwitcher
