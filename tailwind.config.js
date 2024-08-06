const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    container: {
      padding: '100px',
      center: true
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}