/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenText: "#426532",
        lightBlue: "#A0AECD",
        darkLightBlue: "#95A6CD",
        charcoal: "#454444",
      },
      fontFamily: {
        title: "Playfair Display",
        rubik: "Rubik",
        montserrat: "Montserrat",
      },
      borderRadius: {
        circular: "50%",
      },
    },
  },
  plugins: [],
};
