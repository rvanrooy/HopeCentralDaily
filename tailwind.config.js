
module.exports = {
  content: ['./_site/**/*.html',"./src/**/*.{html,njk}","./node_modules/flowbite/**/*.js"],
  purge: false, // This is handled through postcss.config.js
  theme: {
    extend: {},
  },
  darkMode: "class",
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('flowbite/plugin')],
};
