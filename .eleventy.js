const fs = require("fs");
const htmlmin = require("html-minifier");
const dumpFilter = require("@jamshop/eleventy-filter-dump");
const {parse} = require("csv-parse/sync");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { format, enZA } = require('date-fns');
const postCss = require('postcss');
const tailwind = require('tailwindcss');
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  	// Registering a async filter to all nunjuck templates
	// unfortunally it didn't saw the possiblity to register
	// 'global' async filters (say for all other templating engines
	// but I'm fine with this solution
	eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
		// Here is where the magic will happen
		postCss([
			tailwind({
				// config for tailwind goes here
				content: ['./_site/**/*.html', './src/**/*.{md,html,njk}'],
				// purge: false, // This is handled through postcss.config.js
				theme: {},
				plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
			}),
		])
			.process(cssCode)
			.then(
				(r) => done(null, r.css),
				(e) => done(e, null)
			);
	});

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
    './node_modules/flowbite/dist/flowbite.min.js': './js/flowbite.min.js'
  })
  
  // Date filters
	// -----------------------------
	eleventyConfig.addFilter('datefmt', (contentDate) => {
		return format(contentDate, "LLL d'th' - yyyy");
	});

  eleventyConfig.addFilter('datefmtstr', (contentDate) => {

  
		// return format(new Date(contentDate), "d LLL");
    
    return format(new Date(contentDate), 'd LLL', { timeZone: 'GMT+2', locale: enZA });
	});

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("dump", dumpFilter);
  

  eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./_components/**/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});
  // add support for tsv
  eleventyConfig.addDataExtension("tsv", (contents) => {
  const records = parse(contents, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t"
  });
  return records;
});

eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  var pathPrefix = "/HopeCentralDaily/";
  if (process.env.GITHUB_REPOSITORY) {
    pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
  }

  return {
    dir: {
      input: "src",
      layouts: '_includes/layouts',
    },
    pathPrefix: "HopeCentralDaily"
  }
};

function htmlminTransform(content, outputPath) {
  if( outputPath.endsWith(".html") ) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
    return minified;
  }
  return content;
}
