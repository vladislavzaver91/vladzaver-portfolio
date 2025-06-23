export class SwiperPaginationService {
	static paginationBase = {
		clickable: true,
		renderBullet: (index: number, className: string) => {
			return `<span class="${className} "></span>`
		},
	}
}
