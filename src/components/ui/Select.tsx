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
		<div className='relative' ref={selectRef}>
			<label
				className={`absolute top-[-8px] left-3 text-sm bg-white px-1 transition-all duration-300 ${
					isOpen || value ? 'text-xs text-blue-600' : 'text-gray-500'
				}`}
			>
				{label}
			</label>

			<div
				className={`flex border border-gray-300 rounded-md p-2 cursor-pointer transition-all ${
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

// import React, { useState } from "react";
// import { FaCheck } from "react-icons/fa";

// interface CustomSelectProps {
//   label: string; // Название селекта
//   options: string[]; // Опции для выбора
//   value: string; // Текущее выбранное значение
//   onChange: (value: string) => void; // Колбэк при изменении значения
// }

// const CustomSelect: React.FC<CustomSelectProps> = ({
//   label,
//   options,
//   value,
//   onChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOptionClick = (option: string) => {
//     onChange(option); // Передаем выбранное значение в родительский компонент
//     setIsOpen(false); // Закрываем селект
//   };

//   return (
//     <div className="relative">
//       {/* Название селекта */}
//       <label
//         className={`absolute top-[-8px] left-3 text-sm bg-white px-1 transition-all duration-300 ${
//           isOpen || value ? "text-xs text-blue-600" : "text-gray-500"
//         }`}
//       >
//         {label}
//       </label>

//       {/* Основной селект */}
//       <div
//         className={`border border-gray-300 rounded-md p-2 cursor-pointer transition-all ${
//           isOpen ? "border-blue-600" : "hover:border-gray-400"
//         }`}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {value || "Select"} {/* Если нет значения, показываем "Select" */}
//       </div>

//       {/* Опции */}
//       {isOpen && (
//         <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
//           {options.map((option) => (
//             <li
//               key={option}
//               className={`p-2 flex items-center justify-between hover:bg-blue-100 cursor-pointer ${
//                 value === option ? "bg-blue-50" : ""
//               }`}
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//               {value === option && <FaCheck className="text-white bg-blue-600 rounded-full w-4 h-4" />}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CustomSelect;
