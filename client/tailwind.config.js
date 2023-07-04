/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenText: "#426532",
        lightBlue: "#A0AECD",
        charcoal: "#454444",
      },
      fontFamily: {
        title: "Lora",
      },
    },
  },
  plugins: [],
};
