export function StructuredData() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'VladZaver',
		jobTitle: 'Full-stack Developer',
		url: 'https://vladzaver-portfolio.vercel.app',
		sameAs: [
			'https://www.linkedin.com/in/vladislav-zavertaylo-480626264/',
			'https://github.com/vladislavzaver91?tab=repositories',
		],
	}

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
