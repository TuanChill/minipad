import TailwindForm from "@tailwindcss/forms";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(235, 87, 87)",
        sidebar_hover: "rgba(55,53,47,0.08)"
      }
    },
  },
  plugins: [
    TailwindForm,
  ],
};
