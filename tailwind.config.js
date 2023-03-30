module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        kaushan: "Kaushan Script",
      },
      backgroundImage: {
        hero1: "url(src/assets/images/hero1.jpg)",
        hero2: "url(src/assets/images/hero2.jpg)",
        hero3: "url(src/assets/images/hero3.jpg)",
      },
    },
  },
  plugins: [],
};

// module.exports = {
//     mode: "jit",
//     content: ["./src/**/*.{js,jsx,ts,tsx}"],
//     theme: {
//       extend: {
//         colors: {
//           "dark-purple": "#081A51",
//           "light-white": "rgba(255,255,255,0.17)",
//         },
//       },
//     },
//     plugins: [],
// };