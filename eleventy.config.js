const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const { DateTime } = require("luxon");

module.exports = (config) => {
    // We need to copy some shits to the output folder
    config.addPassthroughCopy({ "public": "." });
    config.addPassthroughCopy("src/**/*.{svg,webp,png,jpeg,jpg}");
    
    // Watch images and stuff
    config.addWatchTarget("src/**/*.{svg,webp,png,jpeg,jpg}");
    
    // Some plugins
    config.addPlugin(bundlerPlugin);
    
    // Filter: get readable date to posts
    config.addFilter("getHumanDate", (date) => {
        return DateTime.fromJSDate(date).toFormat("dd LLL, yyyy");
    });
    
    return {
        // Da format to handle, dawg.
        templateFormats: [
            "md",
            "njk",
            "html"
        ],
        
        // Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",
		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",
		
		// This for handle io.
		dir: {
		    input: "src",
		    output: "docs",
		    includes: "../_includes",
		    data: "../_data"
		}
    }
}