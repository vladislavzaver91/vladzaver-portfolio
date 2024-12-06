import { EXPERIENCE } from './experience.data';

const ExperienceList = () => {
	return (
		<ul className="flex flex-col gap-12">
			{EXPERIENCE.map((item, index) => (
				<li key={index}>
					<div className="flex justify-between">
						<h3 className="mb-6 font-bold text-xl">{item.title}</h3>
						<p className="font-normal text-sm leading-normal text-secondTextColor">{item.period}</p>
					</div>
					<p className="font-normal text-sm leading-normal text-secondTextColor">{item.descr}</p>
				</li>
			))}
		</ul>
	);
};

export default ExperienceList;
