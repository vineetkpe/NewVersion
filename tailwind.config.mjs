/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // User-Defined Editorial Palette Tokens
        marigold: {
          DEFAULT: '#FFB800',
          hover: '#E6A500',
          soft: '#FFF1CC',
        },
        paper: '#FBF9F4',
        surface: {
          DEFAULT: '#FFFFFF',
          dim: '#F4EFE6',
          bright: '#FFFFFF',
          subtle: '#FAF7F0',
          white: '#FFFFFF',
          border: '#E8E3D8',
          'border-focus': '#FFB800',
        },
        ink: {
          DEFAULT: '#15130F',
          dark: '#15130F',
          primary: '#15130F',
        },
        stone: {
          DEFAULT: '#E8E3D8',
          subtle: '#E8E3D8',
          border: '#E8E3D8',
        },
        muted: {
          DEFAULT: '#605A50',
          secondary: '#605A50',
        },

        // Semantic mappings for compatibility
        primary: {
          DEFAULT: '#FFB800',
          hover: '#E6A500',
          container: '#FFF1CC',
          'on-container': '#15130F',
        },
        brand: {
          marigold: '#FFB800',
          hover: '#E6A500',
          soft: '#FFF1CC',
          paper: '#FBF9F4',
          stone: '#E8E3D8',
          ink: '#15130F',
          muted: '#605A50',
          primary: '#FFB800',
        },
        text: {
          DEFAULT: '#15130F',
          dark: '#15130F',
          primary: '#15130F',
          secondary: '#605A50',
          muted: '#8A8478',
          inverse: '#FFFFFF',
        },
        outline: {
          DEFAULT: '#E8E3D8',
          variant: '#D4CEBF',
          subtle: '#E8E3D8',
        },
        status: {
          up: '#1E7F52',
          warn: '#8A5A00',
          down: '#C23B2A',
          success: '#1E7F52',
          warning: '#8A5A00',
          danger: '#C23B2A',
        },
      },
      fontFamily: {
        display: [
          '"Space Grotesk"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(23, 27, 45, 0.05), 0 1px 2px rgba(23, 27, 45, 0.03)',
        card: '0 4px 12px -2px rgba(23, 27, 45, 0.06), 0 2px 4px -1px rgba(23, 27, 45, 0.03)',
        elevated:
          '0px 4px 16px rgba(23, 27, 45, 0.06), 0 12px 28px -4px rgba(23, 27, 45, 0.08)',
      },
      borderRadius: {
        sm: '0.25rem', // 4px
        DEFAULT: '0.5rem', // 8px
        md: '0.75rem', // 12px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        full: '9999px',
      },
      maxWidth: {
        site: '1280px',
      },
    },
  },
  plugins: [],
};
