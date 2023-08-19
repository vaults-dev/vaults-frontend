/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '90rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sen)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--purple-1))',
          heavy: 'hsl(var(--purple-2))',
          medium: 'hsl(var(--purple-3))',
          light: 'hsl(var(--purple-4))',
          soft: 'hsl(var(--purple-5))',
          foreground: 'hsl(var(--purple-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--blue-1))',
          heavy: 'hsl(var(--blue-2))',
          medium: 'hsl(var(--blue-3))',
          light: 'hsl(var(--blue-4))',
          soft: 'hsl(var(--blue-5))',
          foreground: 'hsl(var(--blue-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--red-1))',
          heavy: 'hsl(var(--red-2))',
          medium: 'hsl(var(--red-3))',
          light: 'hsl(var(--red-4))',
          soft: 'hsl(var(--red-5))',
          foreground: 'hsl(var(--red-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      spacing: {
        18: '4.5rem',
        132: '33rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        lg: '0px 0px 8px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
