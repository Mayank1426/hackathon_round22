/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dk: {
          yellow: {
            DEFAULT: '#FFD83D',
            light: '#FFE566',
            dark: '#E5BE22',
            glow: 'rgba(255, 216, 61, 0.25)',
          },
          purple: {
            DEFAULT: '#7928CA',
            light: '#9E5CF6',
            dark: '#571B96',
            glow: 'rgba(121, 40, 202, 0.25)',
          },
          dark: {
            950: '#060709',
            900: '#0B0D14',
            850: '#10131D',
            800: '#161926',
            700: '#222738',
            600: '#333A52',
          },
          border: 'rgba(255, 255, 255, 0.08)',
          'border-light': 'rgba(255, 255, 255, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounce 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(255, 216, 61, 0.2))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(121, 40, 202, 0.4))' },
        }
      },
      boxShadow: {
        'yellow-glow': '0 0 25px -5px rgba(255, 216, 61, 0.4)',
        'purple-glow': '0 0 30px -5px rgba(121, 40, 202, 0.45)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'neon-yellow': '0 0 20px rgba(255, 216, 61, 0.6), 0 0 40px rgba(255, 216, 61, 0.3)',
        'neon-purple': '0 0 20px rgba(121, 40, 202, 0.6), 0 0 40px rgba(121, 40, 202, 0.3)',
      }
    },
  },
  plugins: [],
}
