import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Button from '../../Button/Button'

const Hero = () => {
	const t = useTranslations('Hero')
	return (
		<div className='container'>
			<div className='wrapper flex flex-col items-center'>
				<div className='overflow-hidden relative rounded-full w-[213px] h-[213px] bg-[linear-gradient(138deg,_#ff8660_0%,_#8000ff_98.96%)] mb-10'>
					<Image
						src='/main/Zavertaylo_V.png'
						alt='Vladislav Zavertaylo'
						fill
						sizes='(max-width: 768px) 100vw, 213px'
						className='object-cover object-top'
					/>
				</div>
				<h1 className='font-extrabold text-6xl leading-[1.15] text-primeColor font-montserrat mb-10 text-center'>
					{t('VladislavZavertaylo')} <br />
					<span className='gradient-text'>Front-end developer</span>
				</h1>
				<p className='font-light text-lg text-secondColor  tracking-extra-tight text-center mb-12'>
					I am a front-end developer with professional experience of more than
					half a year, specializing in the development of adaptive web projects.
					My experience includes creating projects of different complexity -
					from one-page lendings to multifunctional web applications using
					React.js and Next.js
				</p>
				<div className='flex gap-5'>
					<Button isLink href='/contact'>
						Get In Touch
					</Button>
					<Button>Download CV</Button>
				</div>
			</div>
		</div>
	)
}

export default Hero
