/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        "color-500": {
          500: '',
        },
        "blue-zodiac": {
          //D'aquestes variants el que s'utilitza es la 950
          50: "#ebfaff",
          100: "#d3f2ff",
          200: "#b1e8ff",
          300: "#7bdeff",
          400: "#3dc7ff",
          500: "#10a6ff",
          600: "#0084ff",
          700: "#006cff",
          800: "#0056d0",
          900: "#111827",
          950: "#061f41",
        },
        "fuchsia-pink": {
          //D'aquestes variants el que s'utilitza es la 600
          50: "#fcf5fe",
          100: "#f8ebfc",
          200: "#f3d6f8",
          300: "#eab5f2",
          400: "#de89e9",
          500: "#cb5bda",
          600: "#b843c4",
          700: "#952e9d",
          800: "#7b2880",
          900: "#67256a",
          950: "#430d45",
        },
        "blue-violet": {
          //D'aquestes variants el que s'utilitza es la 700
          50: "#f4f5fa",
          100: "#e5e7f4",
          200: "#d1d6ec",
          300: "#b1badf",
          400: "#8c98ce",
          500: "#7079c1",
          600: "#5d60b3",
          700: "#5857aa",
          800: "#494786",
          900: "#3e3d6b",
          950: "#292843",
        },
        "bright-turquoise": {
          //D'aquestes variants el que s'utilitza es la 500
          50: "#eefffb",
          100: "#c6fff4",
          200: "#8effec",
          300: "#4dfbe1",
          400: "#19e8cf",
          500: "#00e6ce",
          600: "#00a497",
          700: "#02837a",
          800: "#086762",
          900: "#0c5550",
          950: "#003433",
        },
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require("tw-elements-react/dist/plugin.cjs")],
}