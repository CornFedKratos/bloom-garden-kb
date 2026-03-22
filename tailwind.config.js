/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          moss:      '#4a7c59',
          sage:      '#7fb08a',
          bloom:     '#c8a4a5',
          petal:     '#e8d5c4',
          soil:      '#6b4f3a',
          dusk:      '#2d3b2e',
          dawn:      '#f5ede0',
          mist:      '#e8ede9',
          firefly:   '#d4a843',
          slate:     '#4a5568',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'float-slow':   'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite 1s',
        'float-fast':   'float 5s ease-in-out infinite 2s',
        'breathe':      'breathe 4s ease-in-out infinite',
        'fade-up':      'fadeUp 0.8s ease-out forwards',
        'fade-up-delay-1': 'fadeUp 0.8s ease-out 0.15s forwards',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.3s forwards',
        'fade-up-delay-3': 'fadeUp 0.8s ease-out 0.45s forwards',
        'fade-up-delay-4': 'fadeUp 0.8s ease-out 0.6s forwards',
        'shimmer':      'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)',    opacity: '0.7' },
          '50%':      { transform: 'scale(1.08)', opacity: '1'   },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1'   },
        },
      },
    },
  },
  plugins: [],
}
