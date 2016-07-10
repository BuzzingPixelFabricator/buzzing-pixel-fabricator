/* globals module, __dirname */

module.exports = function(grunt) {
	// Set up primary JS file
	var primaryJsFile = grunt.fabConfig.assets + '/js/script.min.js';
	var jsFiles = {};

	// Setup primary source
	jsFiles[primaryJsFile] = [];

	// Check for build before files in project file
	if (grunt.fabConfig.jsBuildBefore.length) {
		// Loop through the build before files
		grunt.fabConfig.jsBuildBefore.forEach(function(i) {
			// Push them into the primary JS file compile array
			jsFiles[primaryJsFile].push(i);
		});
	}

	// Add primary fab setup files
	jsFiles[primaryJsFile].push(__dirname + '/../js/fab.js');

	// Add all other Fabricator JS files
	jsFiles[primaryJsFile].push(__dirname + '/../js/**/*.js');

	// Add setup file
	jsFiles[primaryJsFile].push(grunt.fabConfig.source + '/js/setup.js');

	// Add components
	jsFiles[primaryJsFile].push(grunt.fabConfig.source + '/js/components/**/*.js');

	// Add all other files except main
	jsFiles[primaryJsFile].push(grunt.fabConfig.source + '/js/**/*.js');
	jsFiles[primaryJsFile].push('!' + grunt.fabConfig.source + '/js/main.js');

	// Check for build files in the project file
	if (grunt.fabConfig.jsBuild.length) {
		// Loop through the build files
		grunt.fabConfig.jsBuild.forEach(function(i) {
			// Push them into the primary JS file compile array
			jsFiles[primaryJsFile].push(i);
		});
	}

	// Add main js file
	jsFiles[primaryJsFile].push(grunt.fabConfig.source + '/js/main.js');

	// Check for build after files
	if (grunt.fabConfig.jsBuildAfter.length) {
		// Loop through the build after files
		grunt.fabConfig.jsBuildAfter.forEach(function(i) {
			// Add the file to the primary JS file array
			jsFiles[primaryJsFile].push(i);
		});
	}

	// Check if there are individual javascript files to compile in project file
	if (Object.keys(grunt.fabConfig.jsFiles).length) {
		// Loop through the files
		for (var key in grunt.fabConfig.jsFiles) {
			// Create a uglify file array for it
			jsFiles[grunt.fabConfig.assets + '/js/' + key] = grunt.fabConfig.jsFiles[key];
		}
	}

	// Set grunt config for javascript
	grunt.fabInitConfig.uglify = {
		build: {
			options: {
				sourceMap: grunt.fabConfig.sourceMaps,
				mangle: grunt.fabConfig.jsCompress,
				compress: grunt.fabConfig.jsCompress,
				beautify: ! grunt.fabConfig.jsCompress,
				sourceMapIncludeSources: true
			},
			files: jsFiles
		}
	};
};
