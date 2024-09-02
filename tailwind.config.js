/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1920px',
      // => @media (min-width: 1600px) { ... }
    },
    extend: {
      colors: {
        green: {
          500: "#24AE7C",
          600: "#0D2A1F",
        },
        blue: {
          500: "#79B5EC",
          600: "#152432",
        },
        red: {
          500: "#F37877",
          600: "#3E1716",
          700: "#F24E43",
        },
        light: {
          200: "#E8E9E9",
        },
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
      },
      boxShadow: {
        'fancy-1': 'inset 20px 20px 20px rgba(0, 0, 0, .05), 25px 35px 20px rgba(0, 0, 0, .05), 25px 30px 30px rgba(0, 0, 0, .05), inset -20px -20px 25px rgba(255, 255, 255, 0.9)',
        'fancy-2': 'inset 23px -23px 46px #c1c1c2, inset -23px 23px 46px #ffffff',
        'fancy-3': 'inset 21px 21px 41px #8e2537, inset -21px -21px 41px #ff5985',
        'fancy-4': 'inset 21px 21px 41px #096b4b, inset -21px -21px 41px #17ffb7',
        'fancy-inner': 'inset 0px 0px 5px #71717a',
      },
      borderRadius: {
        'fancy-1': '57% 43% 43% 57% / 43% 43% 57% 57%',
        'fancy-2': '31% 69% 37% 63% / 61% 41% 59% 39%',
        'fancy-3': '35% 65% 31% 69% / 57% 59% 41% 43%',
        'fancy-4': '23% 77% 80% 20% / 52% 41% 59% 48% ',
      },
      backgroundImage: {
        'fancy-gradient': 'linear-gradient(45deg, #bfbfbf, #e6e6e6)',
      },
    },
  },
  plugins: [],
}