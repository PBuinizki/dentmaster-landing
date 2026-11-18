import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        sand: 'rgb(var(--sand) / <alpha-value>)',
        'sand-deep': 'rgb(var(--sand-deep) / <alpha-value>)',
        mint: 'rgb(var(--mint) / <alpha-value>)',
        'mint-soft': 'rgb(var(--mint-soft) / <alpha-value>)',
        forest: 'rgb(var(--forest) / <alpha-value>)',
        'forest-deep': 'rgb(var(--forest-deep) / <alpha-value>)',
        amber: 'rgb(var(--amber) / <alpha-value>)',
      },
      screens: {
        xs: '400px',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Manrope', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Golos Text', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        caption: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.65' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        lead: ['1.1875rem', { lineHeight: '1.65' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(15 23 42 / 0.04), 0 12px 32px -12px rgb(15 23 42 / 0.12)',
        lift: '0 2px 4px rgb(15 23 42 / 0.04), 0 24px 48px -20px rgb(15 23 42 / 0.22)',
        float: '0 32px 80px -32px rgb(15 23 42 / 0.35)',
        ring: 'inset 0 0 0 1px rgb(15 23 42 / 0.06)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'soft-pulse': 'soft-pulse 9s ease-in-out infinite',
        drift: 'drift 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
