import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			boxShadow: {
				custom: '0 4px 16px -2px rgba(0, 0, 0, 0.1)',
				// darkMode
				dCustom: '0 35px 50px -15px rgba(0, 0, 0, 0.5)',
			},
			colors: {
				primeColor: '#ffffff',
				accentColor: '#5BADFF',
				secondColor: '#8491a0',
				secondTextColor: '#c5c5c5',
				secondBgColor: '#222222',
				darkBgColor: '#374151',
				cardBgColor: '#2a2a2a',
				dBorderColor: '#393a4b',
			},
			backgroundImage: {
				'custom-gradient': 'linear-gradient(135deg, #55ddff 0%, #c058f3 100%)',
			},
			letterSpacing: {
				'extra-tight': '0.02em',
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			animation: {
				shimmer: 'shimmer 1.5s infinite linear',
			},
		},
	},
	plugins: [],
}
export default config
