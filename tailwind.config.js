/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#FFD700',
          pink: '#FF6B35',
          teal: '#4ECDC4',
          blue: '#45B7D1',
          red: '#FF4757',
          dark: '#2C5F2D',
          darker: '#1A3A1B',
          panel: '#97CC04',
          text: '#2C2416',
          textMuted: '#5C4A2F',
        },
        tropical: {
          gold: '#FFD700',
          yellow: '#FFC947',
          orange: '#FF8C42',
          softOrange: '#FFB366',
          brown: '#5C3D2E',
          darkBrown: '#3D2817',
          palmGreen: '#4A9B4F',
          palmDark: '#2C5F2D',
          parrotRed: '#FF4757',
          parrotBlue: '#45B7D1',
          parrotYellow: '#FFC947',
          sand: '#F4E4C1',
          sky: '#87CEEB',
          highlight: '#FFFACD',
        },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 4px 0 #CC9A00, 0 6px 12px rgba(0, 0, 0, 0.3)',
        'neon-pink': '0 4px 0 #CC5528, 0 6px 12px rgba(0, 0, 0, 0.3)',
        'neon-teal': '0 4px 0 #3DA39A, 0 6px 12px rgba(0, 0, 0, 0.3)',
        'neon-blue': '0 4px 0 #3691A7, 0 6px 12px rgba(0, 0, 0, 0.3)',
        'neon-red': '0 4px 0 #CC3845, 0 6px 12px rgba(0, 0, 0, 0.3)',
        'neon-glow': '0 6px 0 #CC9A00, 0 8px 16px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 250, 205, 0.5)',
        'neon-glow-lg': '0 8px 0 #CC9A00, 0 10px 20px rgba(0, 0, 0, 0.5), inset 0 3px 0 rgba(255, 250, 205, 0.6)',
        'chunky-3d': '0 6px 0 #CC9A00, 0 8px 16px rgba(0, 0, 0, 0.4)',
        'chunky-orange': '0 5px 0 #CC5528, 0 7px 14px rgba(0, 0, 0, 0.35)',
        'chunky-green': '0 5px 0 #2C5F2D, 0 7px 14px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 6px 0 #CC9A00, 0 8px 16px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 250, 205, 0.5)',
          },
          '50%': {
            boxShadow: '0 8px 0 #CC9A00, 0 10px 20px rgba(0, 0, 0, 0.5), inset 0 3px 0 rgba(255, 250, 205, 0.7)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(180deg, #FFD700 0%, #FFC947 50%, #FF8C42 100%)',
        'neon-gradient-radial': 'radial-gradient(circle, #FFD700 0%, #FFC947 50%, #FF8C42 100%)',
        'tropical-gradient': 'linear-gradient(135deg, #4ECDC4 0%, #45B7D1 50%, #97CC04 100%)',
        'island-gradient': 'linear-gradient(180deg, #87CEEB 0%, #F4E4C1 100%)',
      },
      borderRadius: {
        'chunky': '20px',
        'super-chunky': '30px',
      },
      borderWidth: {
        '6': '6px',
      },
    },
  },
  plugins: [],
};
