import { useEffect, useRef } from 'react'

const useCloseModal = ({ onClose }: { onClose: () => void }) => {
	const modalRef = useRef<HTMLDivElement>(null) // Ссылка на модальное окно

	useEffect(() => {
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

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	return { modalRef }
}

export default useCloseModal
