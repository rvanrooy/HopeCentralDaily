module.exports = {
  content: ['./_site/**/*.html',"./src/**/*.{html,njk}"],
  purge: false, // This is handled through postcss.config.js
  theme: {
    extend: {},
  },
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
