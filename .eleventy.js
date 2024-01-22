const fs = require("fs");
const htmlmin = require("html-minifier");
const dumpFilter = require("@jamshop/eleventy-filter-dump");
const {parse} = require("csv-parse/sync");

module.exports = function(eleventyConfig) {

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  eleventyConfig.addFilter("dump", dumpFilter);


  // add support for tsv
  eleventyConfig.addDataExtension("tsv", (contents) => {
  const records = parse(contents, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t"
  });
  return records;
});

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  var pathPrefix = "";
  if (process.env.GITHUB_REPOSITORY) {
    pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
  }

  return {
    dir: {
      input: "src"
    },
    pathPrefix
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
