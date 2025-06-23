'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SwiperPaginationService } from '@/services/swiper-pagination.service'
import { SkeletonImage } from './skeleton-image'
import { IoCloseOutline } from 'react-icons/io5'
import { useCloseModal } from '@/hooks/use-close-modal'

interface FullScreenModalProps {
	isOpen: boolean
	onClose: () => void
	images: string[]
	title: string
	initialSlide: number
}

export const FullScreenModal = ({
	isOpen,
	onClose,
	images,
	title,
	initialSlide,
}: FullScreenModalProps) => {
	const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
		new Array(images.length).fill(false)
	)

	const { modalRef } = useCloseModal({ onClose })

	const handleImageLoad = (index: number) => {
		setImagesLoaded(prev => {
			const newLoaded = [...prev]
			newLoaded[index] = true
			return newLoaded
		})
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						ref={modalRef}
						className='relative w-full max-w-4xl h-[80vh] m-4 rounded-2xl overflow-hidden'
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<Swiper
							modules={[Pagination]}
							pagination={SwiperPaginationService.paginationBase}
							initialSlide={initialSlide}
							slidesPerView={1}
							spaceBetween={16}
							grabCursor={true}
							centeredSlides={true}
							className='w-full h-full'
						>
							{images.map((image, index) => (
								<SwiperSlide key={index}>
									<div className='relative w-full h-full'>
										{!imagesLoaded[index] && <SkeletonImage />}
										<Image
											src={image}
											alt={`${title} screenshot ${index + 1}`}
											fill
											className={`object-contain object-center ${
												imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
											}`}
											loading='lazy'
											onLoad={() => handleImageLoad(index)}
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
						<button
							onClick={onClose}
							className='absolute bottom-6 left-1/2 -translate-x-1/2 p-2 rounded-xl bg-darkBgColor text-white hover:bg-cardBgColor transition-colors duration-300 z-30 group'
						>
							<IoCloseOutline className='w-6 h-6 group-hover:text-accentColor transition-colors duration-300' />
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
