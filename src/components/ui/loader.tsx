'use client'

export const Loader = () => {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-darkBgColor/60 backdrop-blur-md'>
			<svg className='loader-svg' viewBox='25 25 50 50' aria-label='Loading...'>
				<circle className='loader-circle' cx='50' cy='50' r='20' />
			</svg>
		</div>
	)
}
