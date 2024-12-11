import { useState } from 'react'
import Select from '../ui/Select'
import SelectWithIcon from '../ui/SelectWithIcon'
import { SKILLS_FILTERS } from './skills-filters.data'

interface IFilterProps {
	onFilterChange: (filters: {
		role: string
		completionYear: string
		type: string
		skills: string[]
	}) => void
}

const ProjectsFilter = ({ onFilterChange }: IFilterProps) => {
	const [filters, setFilters] = useState({
		role: '',
		completionYear: '',
		type: '',
		skills: [] as string[],
	})

	const handleFilterChange = (name: string, value: string | string[]) => {
		const updateFilters = { ...filters, [name]: value }
		setFilters(updateFilters)
		onFilterChange(updateFilters)
	}

	return (
		<div className='filters flex gap-5 mb-12'>
			<Select
				label='Role'
				options={['Front-end developer']}
				value={filters.role}
				onChange={value => handleFilterChange('role', value)}
			/>
			<Select
				label='Completion Year'
				options={['In progress', '2022', '2023', '2024']}
				value={filters.completionYear}
				onChange={value => handleFilterChange('completionYear', value)}
			/>
			<Select
				label='Type'
				options={['Commercial project', 'Pet-project', 'Course project']}
				value={filters.type}
				onChange={value => handleFilterChange('type', value)}
			/>
			<SelectWithIcon
				label='Skills'
				options={SKILLS_FILTERS.map(skill => ({
					name: skill.name,
					icon: skill.icon,
				}))}
				value={filters.skills}
				onChange={value => handleFilterChange('skills', value)}
			/>
		</div>
	)
}

export default ProjectsFilter
