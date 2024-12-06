'use client';
import Image from 'next/image';
import { SKILL_ICONS } from './skills.data';

const SkillIconList = () => {
	return (
		<ul className="flex flex-wrap justify-center gap-14">
			{SKILL_ICONS.map((icon, index) => (
				<li key={index} className="icon-overlay min-w-11 min-h-11 relative">
					<Image src={icon.src} alt={icon.name} width={44} height={44} className="icon-gray transition duration-300" />
				</li>
			))}
		</ul>
	);
};

export default SkillIconList;
