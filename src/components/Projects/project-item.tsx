'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useState } from 'react'
import { SkeletonImage } from '../ui/skeleton-image'
import { FullScreenModal } from '../ui/full-screen-modal'
import { LuFullscreen } from 'react-icons/lu'
import { IoCloseOutline } from 'react-icons/io5'
import { useTranslations } from 'next-intl'
import { useCloseModal } from '../../hooks/use-close-modal'
import { SwiperPaginationService } from '../../services/swiper-pagination.service'
import { getProjects } from './projects.data'

export const ProjectItem = ({
	id,
	onClose,
}: {
	id: string
	onClose: () => void
}) => {
	const t = useTranslations('Projects')

	const PROJECTS = getProjects(t)
	const project = PROJECTS.find(p => p.id === id)

	const [isFullScreen, setIsFullScreen] = useState(false)
	const [initialSlide, setInitialSlide] = useState(1)
	const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
		new Array(project?.images.length || 3).fill(false)
	)

	const { modalRef } = useCloseModal({
		onClose,
		isEnabled: !isFullScreen,
	})

	const handleImageLoad = (index: number) => {
		setImagesLoaded(prev => {
			const newLoaded = [...prev]
			newLoaded[index] = true
			return newLoaded
		})
	}

	if (!project) {
		return <p>Project not found</p>
	}

	return (
		<div ref={modalRef}>
			<div className=' w-full h-[40vh] lg:h-[50vh] py-4 relative overflow-hidden'>
				<Swiper
					modules={[Pagination]}
					pagination={SwiperPaginationService.paginationBase}
					initialSlide={initialSlide}
					slidesPerView={1}
					spaceBetween={16}
					grabCursor={true}
					centeredSlides={true}
					className='w-full h-full'
					onSlideChange={swiper => setInitialSlide(swiper.activeIndex)}
					breakpoints={{
						1024: {
							slidesPerView: 2.1,
							spaceBetween: 16,
							centeredSlides: true,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 15,
							centeredSlides: true,
						},
					}}
				>
					{project.images.map((image, index) => (
						<SwiperSlide key={index}>
							<div className='relative w-full h-full'>
								{!imagesLoaded[index] && (
									<SkeletonImage className='rounded-lg' />
								)}
								<Image
									src={image}
									alt={`${project.title} screenshot ${index + 1}`}
									fill
									className={`object-cover object-center rounded-lg shadow-md transition-transform duration-300 ${
										imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
									}`}
									loading='lazy'
									onLoad={() => handleImageLoad(index)}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Кнопка полноэкранного режима */}
				<button
					onClick={() => setIsFullScreen(true)}
					className='absolute bottom-4 left-4 p-2 rounded-xl bg-black/50 text-white hover:bg-black/70 transition-colors duration-300 z-10 group'
				>
					<LuFullscreen className='w-6 h-6 group-hover:text-accentColor transition-colors duration-300' />
				</button>

				{/* Кнопка закрытия */}
				<button
					onClick={onClose}
					className='absolute top-4 right-4 p-2 rounded-xl bg-black/50 text-white hover:bg-black/70 transition-colors duration-300 z-30 group'
				>
					<IoCloseOutline className='w-6 h-6 group-hover:text-accentColor transition-colors duration-300' />
				</button>
			</div>

			{/* Контент с кастомным скроллом */}
			<div className='max-h-[50vh] lg:max-h-[40vh] h-auto overflow-y-auto custom-scrollbar p-4 lg:p-6'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-full'>
					<div className='lg:col-span-2 space-y-4'>
						<h3 className='text-xl font-bold uppercase tracking-widest text-primeColor'>
							{project.title}
						</h3>
						<p className='text-secondColor tracking-wide text-base'>
							{project.description}
						</p>
						<p className='text-secondColor tracking-wide text-base'>
							<span className='font-semibold'>{t('role')}: </span>
							{project.role}
						</p>
						<p className='text-secondColor tracking-wide text-base'>
							<span className='font-semibold'>{t('period')}: </span>
							{project.period}
						</p>
					</div>
					<div className='lg:col-span-1 space-y-4'>
						<p className='text-secondColor tracking-wide text-base'>
							<span className='font-semibold'>{t('TypeOfProject')}: </span>
							{project.type}
						</p>
						<div className='flex flex-wrap gap-2'>
							{project.skills.map(skill => (
								<div
									key={skill.name}
									className='flex items-center rounded-full py-2 px-4 bg-cardBgColor/80 backdrop-blur-sm hover:bg-cardBgColor transition-colors duration-200'
								>
									<img
										src={skill.icon}
										alt={skill.name}
										className='w-5 h-5 mr-2'
									/>
									<span className='text-secondColor text-sm'>{skill.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Полноэкранная модалка */}
			<FullScreenModal
				isOpen={isFullScreen}
				onClose={() => setIsFullScreen(false)}
				images={project.images}
				title={project.title}
				initialSlide={initialSlide}
			/>
		</div>
	)
}
