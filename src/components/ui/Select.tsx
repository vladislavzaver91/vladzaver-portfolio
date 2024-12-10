import useClickOutside from '@/hooks/useClickOutside'
import { FaCheck, FaTimes } from 'react-icons/fa'

interface ISelectProps {
	label: string
	options: string[]
	value: string
	onChange: (value: string) => void
}

const Select = ({ label, options, value, onChange }: ISelectProps) => {
	const { isOpen, setIsOpen, selectRef } = useClickOutside()

	const handleOptionClick = (option: string) => {
		const newValue = value === option ? '' : option
		onChange(newValue)
		setIsOpen(false)
	}

	const handleClearSelection = (e: React.MouseEvent) => {
		e.stopPropagation()
		onChange('')
	}

	return (
		<div className='relative w-full' ref={selectRef}>
			<label className='label group cursor-pointer'>
				<span
					className={`label-text ${
						isOpen || value ? 'text-xs text-blue-600' : 'text-gray-500'
					}`}
				>
					{label}
				</span>
				<div
					className={`label-input text-gray-700 flex ${
						isOpen ? 'border-blue-600' : 'hover:border-gray-400'
					}`}
					onClick={() => setIsOpen(!isOpen)}
				>
					{value || 'Select'}

					{value && (
						<FaTimes
							className='text-red-500 cursor-pointer ml-1'
							onClick={handleClearSelection}
						/>
					)}
				</div>
			</label>

			{isOpen && (
				<ul className='absolute z-10 mt-1 w-full bg-gray-600 border border-gray-300 rounded-md shadow-lg'>
					{options.map(option => (
						<li
							key={option}
							className={`p-2 flex items-center justify-between hover:bg-gray-800 cursor-pointer ${
								value === option ? 'bg-gray-700' : ''
							}`}
							onClick={() => handleOptionClick(option)}
						>
							{option}
							{value === option && (
								<FaCheck className='text-white bg-blue-600 rounded-full w-4 h-4' />
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Select
