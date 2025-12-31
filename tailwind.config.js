/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Noto Sans JP', 'serif'],
        sans: ['Outfit', 'Noto Sans JP', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        'black': '#000000',
        'dark': '#1a1a1a',
        'charcoal': '#2d2d2d',
        'gray-dark': '#404040',
        'gray': '#666666',
        'gray-light': '#999999',
        'gray-lighter': '#cccccc',
        'silver': '#e5e5e5',
        'pearl': '#f5f5f5',
        'white': '#ffffff',
        'slate': '#4a5568',
        'accent': '#333333',
      },
      backgroundImage: {
        'gradient-bw': 'linear-gradient(135deg, #000000 0%, #2d2d2d 50%, #404040 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
        'gradient-mesh': `radial-gradient(at 20% 30%, rgba(0, 0, 0, 0.03) 0px, transparent 50%),
                         radial-gradient(at 80% 70%, rgba(0, 0, 0, 0.02) 0px, transparent 50%),
                         radial-gradient(at 50% 50%, rgba(0, 0, 0, 0.01) 0px, transparent 50%)`,
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 30px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 40px rgba(0, 0, 0, 0.18)',
        'glow': '0 0 30px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
