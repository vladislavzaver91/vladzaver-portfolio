import Image from 'next/image';
import Link from 'next/link';
import { SOCIAL_LINKS } from './social-links.data';

const SocialLinkList = () => {
	return (
		<ul className="flex mt-auto justify-center gap-4">
			{SOCIAL_LINKS.map(item => (
				<li key={item.name} className="icon-overlay min-w-8 min-h-8 relative">
					<Link href={item.href}>
						<Image
							src={item.src}
							alt={item.name}
							width={32}
							height={32}
							className='icon-gray transition duration-300"'
						/>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default SocialLinkList;
