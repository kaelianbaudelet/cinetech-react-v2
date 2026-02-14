/** @type {import('tailwindcss').Config} */
export default {
  // Activation du mode sombre via la classe 'dark' appliquée sur le document
  darkMode: 'class',
  // Fichiers à analyser pour générer les classes CSS Tailwind
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
