import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				emerald: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#00e58f',
					600: '#05c479',
					700: '#059e62',
					800: '#067a4d',
					900: '#045e3c',
					950: '#022116',
				},
				green: {
					50: '#f0fdf6',
					100: '#dcfce9',
					200: '#bbf7cf',
					300: '#86efa3',
					400: '#4ade73',
					500: '#10b943',
					600: '#059632',
					700: '#047826',
					800: '#065f1f',
					900: '#064e1c',
					950: '#011c0c',
				},
				lime: {
					50: '#f7fee7',
					100: '#ecfcc9',
					200: '#d9f99d',
					300: '#bef264',
					400: '#a3e635',
					500: '#84cc16',
					600: '#65a30d',
					700: '#4d7c0f',
					800: '#3f6212',
					900: '#365314',
					950: '#111e03',
				},
			},
			fontFamily: {
				sans: ['"Plus Jakarta Sans"', 'sans-serif'],
				tech: ['"Rajdhani"', 'sans-serif'],
				mono: ['"Share Tech Mono"', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-14px)' },
				},
				'float-gentle': {
					'0%, 100%': { transform: 'translateY(0px) scale(1)' },
					'50%': { transform: 'translateY(-6px) scale(1.02)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.12', transform: 'scale(1)' },
					'50%': { opacity: '0.22', transform: 'scale(1.1)' },
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				'spin-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 4s ease-in-out infinite',
				'float-slow': 'float 6s ease-in-out infinite',
				'float-gentle': 'float-gentle 8s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 5s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
				'spin-slow': 'spin-slow 22s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
