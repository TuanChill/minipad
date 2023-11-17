/* eslint-disable no-undef */

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(235, 87, 87)",
        sidebar_hover: "rgba(55,53,47,0.08)"
      },
      width: {
        av_small: "30px",
      },
      height: {
        h_header: "50px"
      },
      fontFamily: {
        "logo": "Agbalumo",
      }, 
      maxWidth: {
        "main": "80rem",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
