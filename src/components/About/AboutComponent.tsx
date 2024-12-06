import Image from 'next/image'
import Link from 'next/link'
import AboutSocialLinks from './AboutSocialLinks'

const AboutComponent = () => {
	return (
		<div className='wrapper flex flex-col gap-10'>
			<div className='flex gap-7 w-full'>
				<h3 className='flex-1 font-extrabold text-5xl leading-[1.15] text-primeColor font-montserrat'>
					I write code because I love it.
				</h3>
				<p className='flex-1 font-light text-lg text-secondColor  tracking-extra-tight'>
					My name is Vladislav and I am a front-end developer. After graduating
					from GoIT IT school with a degree in full-stack development, I gained
					knowledge of HTML, CSS, JavaScript, React, and Node.js. I have more
					than six months of commercial experience as a front-end developer,
					working on a project - a website of a public organization that deals
					with environmental protection and ecology.
				</p>
			</div>
			<div className='flex gap-7 w-full'>
				<div className='flex-1'>
					<p className='mb-4 font-light text-lg text-secondColor tracking-extra-tight'>
						It is important for me to create clean and user-friendly code with
						attention to detail. In the process, I always strive to find the
						most effective solutions and remain open to new ideas. I'm sociable,
						easy to get along with the team, and I don't stop learning - in my
						free time I improve my skills and experiment with new technologies.
					</p>
					<p className='font-light text-lg text-secondColor tracking-extra-tight'>
						I write code because it gives me pleasure and opens up new
						opportunities. I want to develop as a front-end developer and am
						constantly working on my professional growth.
					</p>
				</div>
				<Link href='/' className='flex-1'>
					<div className='overflow-hidden relative w-[390px] h-[301px] rounded-2xl'>
						<Image
							src='/about/certificate.png'
							alt='certificate'
							fill
							sizes='(max-width: 768px) 100vw, 264px'
							className='object-cover object-center'
						/>
					</div>
				</Link>
			</div>
			<AboutSocialLinks />
		</div>
	)
}

export default AboutComponent
