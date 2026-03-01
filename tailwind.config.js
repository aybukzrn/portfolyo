/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: { 
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
      },
      colors: {
        mavi: "#1a366b",
      },
    },
  },
  plugins: [],
}