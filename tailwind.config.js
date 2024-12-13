/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'darkModeElements': 'hsl(209, 23%, 22%)',
      'darkModeBackground': 'hsl(207, 26%, 17%)',
      'lightModeText': 'hsl(200, 15%, 8%)',
      'lightModeInput': ' hsl(0, 0%, 52%)',
      'lightModeBackground': 'hsl(0, 0%, 98%)',
      'DarkModeText&LightModeElements': 'hsl(0, 0%, 100%)',
    },
    screens: {
      'sm': '345px',
      // => @media (min-width: 576px) { ... }

      'md': '600px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    
    
    extend: {

      // screens: {
      //   'sm': '345px',
      // },
    },
  },
  plugins: [],
}