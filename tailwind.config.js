const { hover } = require('framer-motion')

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
// const magillo = require('./src/assets/fonts/Magillo-Regular.ttf')
module.exports = {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				magillo: ['Magillo', 'sans-serif'],
				sans: ['Inter', ...defaultTheme.fontFamily.sans], // Default sans-serif font
				serif: ['Merriweather', ...defaultTheme.fontFamily.serif], // Default serif font
				mono: ['FiraCode', ...defaultTheme.fontFamily.mono], // Monospace font for code
				custom: ['Poppins', 'sans-serif'], // Custom font (e.g., Poppins)
			},
			// Custom Font Sizes (optional)
			fontSize: {
				xs: '0.75rem', // Extra Small
				sm: '0.875rem', // Small
				base: '1rem', // Base
				lg: '1.125rem', // Large
				xl: '1.25rem', // Extra Large
				'2xl': '1.5rem', // 2X Large
				'3xl': '1.875rem', // 3X Large
				'4xl': '2.25rem', // 4X Large
				'5xl': '3rem', // 5X Large
				'6xl': '4rem', // 6X Large
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				charcoalGray: '#2D2D2D',
				backgroundColor: '#F5F5F5',
				header: {
					background: ' #1E88E5',
					hover: '#1565C0',
					color: ' #FFFFFF',
				},
				primary: {
					DEFAULT: '#1E88E5',
					hover: '#1565C0',
				},
				footer: {
					DEFAULT: '#263238',
					link: '#1E88E5',
					'link-hover': '#1565C0',
				},
				button: {
					primary: {
						DEFAULT: '#FFC107',
						hover: '#FFA000',
					},
					secondary: {
						DEFAULT: '#757575',
						hover: '#616161',
					},
					success: {
						DEFAULT: '#4CAF50',
						hover: '#388E3C',
					},
				},
				slot: {
					available: '#4CAF50',
					booked: '#FF5252',
					selected: '#FFC107',
				},
				customLightGreen: '#C4E8C2',
				customDarkGreen: '#46A094',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
