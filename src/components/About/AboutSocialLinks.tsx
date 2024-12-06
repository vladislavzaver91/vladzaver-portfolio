import Link from 'next/link'
import { SOCIAL_LINKS } from '../Footer/social-links.data'

const AboutSocialLinks = () => {
	return (
		<div className='mt-7'>
			<h4 className='font-extrabold text-4xl leading-[1.15] text-primeColor font-montserrat mb-6'>
				Follow Me On:
			</h4>
			<ul className='flex justify-between'>
				{SOCIAL_LINKS.map(item => (
					<li key={item.name}>
						<Link
							href={item.href}
							className='font-bold text-2xl tracking-extra-tight text-secondTextColor link-hover'
						>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default AboutSocialLinks
