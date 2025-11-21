/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem"
      }
    }
  },
  plugins: []
};
