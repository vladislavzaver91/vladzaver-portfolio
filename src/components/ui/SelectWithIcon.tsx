import useClickOutside from '@/hooks/useClickOutside'
import { useEffect, useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

interface ISelectWithIconProps {
	label: string
	options: { name: string; icon: string }[]
	value: string[]
	onChange: (selected: string[]) => void
}

const SelectWithIcon = ({
	label,
	options,
	value,
	onChange,
}: ISelectWithIconProps) => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredOptions, setFilteredOptions] = useState(options)
	const { isOpen, setIsOpen, selectRef } = useClickOutside()

	useEffect(() => {
		setFilteredOptions(
			options.filter(option =>
				option.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		)
	}, [searchTerm, options])

	const handleOptionClick = (optionName: string) => {
		const isSelected = value.includes(optionName)
		const updateValue = isSelected
			? value.filter(item => item !== optionName)
			: [...value, optionName]
		onChange(updateValue)
		setIsOpen(false)
	}

	const handleRemoveOption = (optionName: string) => {
		const updateValue = value.filter(item => item !== optionName)
		onChange(updateValue)
	}

	return (
		<div className='relative' ref={selectRef}>
			{/* Лейбл */}
			<label
				className={`absolute top-[-8px] left-3 text-sm bg-white px-1 transition-all duration-300 ${
					isOpen || value.length > 0 ? 'text-xs text-blue-600' : 'text-gray-500'
				}`}
			>
				{label}
			</label>

			{/* Поле выбора */}
			<div
				className={`border border-gray-300 rounded-md p-2 cursor-pointer transition-all ${
					isOpen ? 'border-blue-600' : 'hover:border-gray-400'
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				{value.length > 0
					? value.map(selected => (
							<div
								key={selected}
								className='flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm'
							>
								{selected}
								<FaTimes
									className='ml-1 text-red-500 cursor-pointer'
									onClick={e => {
										e.stopPropagation()
										handleRemoveOption(selected)
									}}
								/>
							</div>
					  ))
					: 'Select'}
			</div>

			{/* Выпадающий список */}
			{isOpen && (
				<div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2'>
					{/* Поисковое поле */}
					<input
						type='text'
						className='w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:border-blue-600'
						placeholder='Search...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>

					{/* Список опций */}
					<ul className='max-h-48 overflow-auto'>
						{filteredOptions.length > 0 ? (
							filteredOptions.map(option => (
								<li
									key={option.name}
									className={`p-2 flex items-center justify-between hover:bg-blue-100 cursor-pointer ${
										value.includes(option.name) ? 'bg-blue-50' : ''
									}`}
									onClick={() => handleOptionClick(option.name)}
								>
									<div className='flex items-center'>
										<img
											src={option.icon}
											alt={option.name}
											className='w-5 h-5 mr-2'
										/>
										{option.name}
									</div>
									{value.includes(option.name) && (
										<FaCheck className='text-white bg-blue-600 rounded-full w-4 h-4' />
									)}
								</li>
							))
						) : (
							<li className='p-2 text-gray-500'>No options found</li>
						)}
					</ul>
				</div>
			)}
		</div>
	)
}

export default SelectWithIcon
