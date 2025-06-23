import { useEffect, useRef } from 'react'

interface useCloseModalProps {
	onClose: () => void
	isEnabled?: boolean
}

export const useCloseModal = ({
	onClose,
	isEnabled = true,
}: useCloseModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null) // Ссылка на модальное окно

	useEffect(() => {
		if (!isEnabled) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleClickOutside)

		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)

			document.body.style.overflow = ''
		}
	}, [onClose, isEnabled])

	return { modalRef }
}
