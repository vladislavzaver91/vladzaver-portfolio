'use client'

import { useCallback, useState } from 'react'

const DEFAULT_RESUME = '/resumes/resume_en.pdf'

export function useDownloadResume() {
	const [isDownloading, setIsDownloading] = useState<boolean>(false)

	const downloadResume = useCallback(() => {
		setIsDownloading(true)
		const resumeFile = DEFAULT_RESUME

		const link = document.createElement('a')
		link.href = resumeFile
		link.download = 'Zavertaylo_Vladislav_Fullstack_developer.pdf'
		link.style.display = 'none'

		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		setIsDownloading(false)
	}, [])

	return { downloadResume, isDownloading }
}
