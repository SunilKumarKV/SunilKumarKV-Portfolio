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
        'slate-950': '#0B0F19',
        slate: {
          950: '#0B0F19',
        },
        'card-surface': '#111827',
        card: '#111827',
        'electric-blue': '#3B82F6',
        electric: {
          blue: '#3B82F6',
          DEFAULT: '#3B82F6',
          glow: 'rgba(59, 130, 246, 0.4)',
        },
        emerald: {
          DEFAULT: '#10B981',
          500: '#10B981',
          glow: 'rgba(16, 185, 129, 0.4)',
        },
        indigo: {
          DEFAULT: '#6366F1',
          500: '#6366F1',
          glow: 'rgba(99, 102, 241, 0.4)',
        },
        surface: {
          dark: '#0B0F19',
          card: '#111827',
          elevated: 'rgba(30, 41, 59, 0.55)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
        'glass-hover': '0 12px 40px -10px rgba(59, 130, 246, 0.25)',
        'specular-blue': '0 0 20px -3px rgba(59, 130, 246, 0.35)',
        'specular-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
      },
      backgroundImage: {
        'specular-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'specular-border': 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(16, 185, 129, 0.2) 100%)',
        'electric-gradient': 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
        'radial-spotlight': 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.12), transparent 40%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        /* Glassmorphism core utilities */
        '.glass-panel': {
          'background': 'rgba(11, 15, 25, 0.75)',
          'backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          '-webkit-backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          'border': '1px solid var(--glass-border-color, rgba(255, 255, 255, 0.08))',
          'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        },
        '.glass-card': {
          'background': 'var(--glass-bg, rgba(255, 255, 255, 0.03))',
          'backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          '-webkit-backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          'border': '1px solid var(--glass-border-color, rgba(255, 255, 255, 0.08))',
          'box-shadow': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        },
        '.glass-card-hover': {
          'background': 'var(--glass-bg, rgba(255, 255, 255, 0.03))',
          'backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          '-webkit-backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          'border': '1px solid var(--glass-border-color, rgba(255, 255, 255, 0.08))',
          'box-shadow': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
          'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.06)',
            'border-color': 'rgba(59, 130, 246, 0.4)',
            'box-shadow': '0 12px 40px -10px rgba(59, 130, 246, 0.25)',
            'transform': 'translateY(-2px)',
          },
        },
        '.glass-pill': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          '-webkit-backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          'border': '1px solid rgba(255, 255, 255, 0.12)',
          'border-radius': '9999px',
        },
        '.glass-input': {
          'background': 'rgba(11, 15, 25, 0.65)',
          'backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          '-webkit-backdrop-filter': 'blur(var(--glass-blur-radius, 12px))',
          'border': '1px solid rgba(255, 255, 255, 0.12)',
          'color': '#F8FAFC',
          '&:focus': {
            'outline': 'none',
            'border-color': '#3B82F6',
            'box-shadow': '0 0 0 2px rgba(59, 130, 246, 0.25)',
          },
        },
        /* Specular gradient borders */
        '.specular-border': {
          'position': 'relative',
          '&::before': {
            'content': '""',
            'position': 'absolute',
            'inset': '0',
            'border-radius': 'inherit',
            'padding': '1px',
            'background': 'var(--specular-border-gradient, linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(16, 185, 129, 0.2) 100%))',
            '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            '-webkit-mask-composite': 'xor',
            'mask-composite': 'exclude',
            'pointer-events': 'none',
          },
        },
      });
    },
  ],
};
