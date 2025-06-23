import { ProjectItems } from '@/types/types'

export const PROJECTS: ProjectItems[] = [
	{
		id: 'go-peei',
		title: 'Website of an environmental NGO',
		description:
			'A multi-page website of a public organization for environmental protection and ecology. The project is commercial. Term of work in the project: more than half a year.',

		mainImage: '/projects/gopeei-1.png',
		images: [
			'/projects/gopeei.png',
			'/projects/gopeei-2.png',
			'/projects/gopeei-3.png',
		],
		skills: [
			{
				name: 'Next.js',
				icon: '/skill-icons/Next.svg',
			},
			{
				name: 'Sass',
				icon: '/skill-icons/Sass.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
			{
				name: 'MongoDB',
				icon: '/skill-icons/MongoDB.svg',
			},
		],
		role: 'Front-end developer',
		period: 'May-Nov 2024',
		type: 'Commercial project',
	},
	{
		id: 'classifieds-marketplace',
		title: 'Classifieds & Auction Marketplace Web App',
		description:
			'Built a multilingual classifieds and auction platform with responsive design and dynamic features. • Designed and implemented backend logic: controllers, routes, CRUD operations for ads and user data, social login (Google, Facebook), currency conversion using Exchange Rate API. • Developed complete frontend with pixel-perfect adaptive layout based on design mockups. • Integrated multilingual support (three languages) with automatic currency selection based on chosen language/region, plus manual override; settings synced with user profile on the server. • Managed dynamic user experiences: different header behavior (authorization status, scroll, page type, screen size), conditional redirects (e.g. first visit, missing nickname). • Created mock data services for city lists across three countries, and ensured full multi-language support using AI-assisted data generation (Grok).',

		mainImage: '/projects/classifieds-marketplace-1.png',
		images: [
			'/projects/classifieds-marketplace.png',
			'/projects/classifieds-marketplace-2.png',
			'/projects/classifieds-marketplace-3.png',
		],
		skills: [
			{
				name: 'Next.js',
				icon: '/skill-icons/Next.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
			{
				name: 'Node',
				icon: '/skill-icons/Node.svg',
			},
			{
				name: 'Express',
				icon: '/skill-icons/Express.svg',
			},
			{
				name: 'Prisma',
				icon: '/skill-icons/prisma.svg',
			},
			{
				name: 'Supabase',
				icon: '/skill-icons/supabase.svg',
			},
			{
				name: 'Axios',
				icon: '/skill-icons/Axios.svg',
			},
		],
		role: 'Fullstack developer',
		period: 'May 2025 - present',
		type: 'Commercial project',
	},
	{
		id: 'luxury-car-interior',
		title: 'Luxury Car Interior E-commerce Website',
		description:
			'Developed a website for an online store specializing in luxury and high-end car interior solutions. • Built all frontend pages with responsive design and business logic implementation. • Integrated frontend logic with backend API using Axios (prepared service classes and request handlers), with temporary mock JSON data used during backend development. • Managed server data using Pinia as a state management solution. • Implemented dynamic price display logic: prices and discounts adjusted automatically based on user role (e.g., dealer-specific pricing, hidden prices for certain products).',

		mainImage: '/projects/luxury-car-interior-1.png',
		images: [
			'/projects/luxury-car-interior.png',
			'/projects/luxury-car-interior-2.png',
			'/projects/luxury-car-interior-3.png',
		],
		skills: [
			{
				name: 'Vue3',
				icon: '/skill-icons/Vue.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'Axios',
				icon: '/skill-icons/Axios.svg',
			},
			{
				name: 'Pinia',
				icon: '/skill-icons/Pinia.svg',
			},
		],
		role: 'Front-end developer',
		period: 'Apr-May 2025',
		type: 'Commercial project',
	},
	{
		id: 'ai-powered-nutrition-assistant',
		title: 'AI-Powered Nutrition Assistant — Telegram Web App',
		description:
			'Developed a Telegram-based nutrition assistant for mobile devices (up to 768px screens). • Designed and implemented backend logic including controllers, routes, and Telegram-based authentication. • Built a Telegram bot that guided users through their nutrition program, providing AI-powered advice. • Integrated AI (OpenAI) to generate nutrition plans based on user-provided data, analyze food photos for nutritional value, and create vitamin plans. • Developed all frontend pages: adaptive layout, UI logic, and API integration using Axios with Context API and React state for data management (no external state managers). • Delivered first-time solutions for Telegram authentication, Telegram bot creation, and AI integration.',

		mainImage: '/projects/ai-nutrition-2.png',
		images: [
			'/projects/ai-nutrition-1.png',
			'/projects/ai-nutrition.png',
			'/projects/ai-nutrition-3.png',
		],
		skills: [
			{
				name: 'React.js',
				icon: '/skill-icons/React.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
			{
				name: 'Node',
				icon: '/skill-icons/Node.svg',
			},
			{
				name: 'Express',
				icon: '/skill-icons/Express.svg',
			},
			{
				name: 'Prisma',
				icon: '/skill-icons/prisma.svg',
			},
			{
				name: 'Supabase',
				icon: '/skill-icons/supabase.svg',
			},
			{
				name: 'Axios',
				icon: '/skill-icons/Axios.svg',
			},
		],
		role: 'Fullstack  developer',
		period: 'Apr 2025',
		type: 'Commercial project',
	},
	{
		id: 'crm-water-delivery',
		title:
			'CRM Web Application for Water Delivery and Vending Machine Management',
		description:
			'Developed a CRM system for a city water delivery service and vending machine management. • Implemented all frontend pages including adaptive layout, business logic, and UI interactions. • Integrated backend APIs (Swagger-based) using Axios, with custom API service classes and React Context for global state, eliminating the need for external state managers. • Built role-based authentication system supporting 5 distinct user roles, with role-specific access and functionality as required by the client. • Handled large datasets for machine configuration settings, integrating dynamic server data into frontend interfaces. • Designed and implemented data visualization features (financial metrics, reports, consumption stats) using tables, charts, and graphs.',

		mainImage: '/projects/crm-main.png',
		images: [
			'/projects/crm-1.png',
			'/projects/crm-2.png',
			'/projects/crm-3.png',
		],
		skills: [
			{
				name: 'React.js',
				icon: '/skill-icons/React.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
			{
				name: 'Axios',
				icon: '/skill-icons/Axios.svg',
			},
		],
		role: 'Front-end developer',
		period: 'Feb-Apr 2025',
		type: 'Commercial project',
	},
	{
		id: 'kinesiology-school',
		title: 'Multi-page Landing Website for a Kinesiology School',
		description:
			'Built a multi-page landing site for a kinesiology school, featuring course descriptions, seminar schedules, documentation, testimonials, photos, and videos. Developed all frontend pages with responsive design, delivering a clean and engaging user experience. • Displayed client-provided content (testimonials, documents, media, descriptions) with visually appealing design and smooth animations. •  Implemented dynamic effects (sliders, parallax scrolling) to enhance interactivity while keeping the interface simple and accessible. • Designed and built seminar data presentation with tables and modal dialogs (including schedules, addresses, and program details).',

		mainImage: '/projects/kinesiology-school-2.png',
		images: [
			'/projects/kinesiology-school-1.png',
			'/projects/kinesiology-school-3.png',
			'/projects/kinesiology-school.png',
		],
		skills: [
			{
				name: 'React.js',
				icon: '/skill-icons/React.svg',
			},
			{
				name: 'TailwindCSS',
				icon: '/skill-icons/TailwindCSS.svg',
			},
			{
				name: 'TypeScript',
				icon: '/skill-icons/TypeScript.svg',
			},
		],
		role: 'Front-end developer',
		period: 'Mar 2025',
		type: 'Commercial project',
	},
]
