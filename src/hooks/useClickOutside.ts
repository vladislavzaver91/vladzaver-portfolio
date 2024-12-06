import { useEffect, useRef, useState } from 'react'

const useClickOutside = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const selectRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return { selectRef, isOpen, setIsOpen }
}

export default useClickOutside
