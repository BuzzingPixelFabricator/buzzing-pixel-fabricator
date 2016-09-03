/* globals module */

module.exports = function(grunt) {
	var key;
	var lessFiles = [
		grunt.fabConfig.source + '/css/**/*.css',
		grunt.fabConfig.source + '/css/**/*.less'
	];
	var jsFiles = [
		grunt.fabConfig.source + '/js/**/*.js'
	];

	// Add any less build files from project file
	if (grunt.fabConfig.lessBuild.length) {
		// Loop through the build files array
		grunt.fabConfig.lessBuild.forEach(function(i) {
			// Push the file into the array to be watched
			lessFiles.push(i);
		});
	}

	// Add individual less files
	if (Object.keys(grunt.fabConfig.lessFiles).length) {
		// Loop through the individual files
		for (key in grunt.fabConfig.lessFiles) {
			// Add individual Less file to the array to be watched
			lessFiles.push(grunt.fabConfig.lessFiles[key]);
		}
	}

	// Check for build before files in project file
	if (grunt.fabConfig.jsBuildBefore.length) {
		// Loop through the build before files
		grunt.fabConfig.jsBuildBefore.forEach(function(i) {
			// Push the file into the array to be watched
			jsFiles.push(i);
		});
	}

	// Check for build files in the project file
	if (grunt.fabConfig.jsBuild.length) {
		// Loop through the build files
		grunt.fabConfig.jsBuild.forEach(function(i) {
			// Push the file into the array to be watched
			jsFiles.push(i);
		});
	}

	// Check for build after files
	if (grunt.fabConfig.jsBuildAfter.length) {
		// Loop through the build after files
		grunt.fabConfig.jsBuildAfter.forEach(function(i) {
			// Push the file into the array to be watched
			jsFiles.push(i);
		});
	}

	// Check if there are individual javascript files to compile in project file
	if (Object.keys(grunt.fabConfig.jsFiles).length) {
		// Loop through the files
		for (key in grunt.fabConfig.jsFiles) {
			// Add individual Less file to the array to be watched
			lessFiles.push(grunt.fabConfig.jsFiles[key]);
		}
	}

	// Set grunt config for watch
	grunt.fabInitConfig.watch = {
		styles: {
			files: lessFiles,
			tasks: [
				'less',
				'notify:less'
			],
			options: {
				spawn: false
			}
		},
		javascript: {
			files: jsFiles,
			tasks: [
				'uglify',
				'notify:uglify'
			],
			options: {
				spawn: false
			}
		},
		jshint: {
			files: [
				'<%= jshint.files %>'
			],
			tasks: [
				'jshint'
			],
			options: {
				spawn: false
			}
		},
		jscs: {
			files: [
				'<%= jscs.src %>'
			],
			tasks: [
				'jscs'
			],
			options: {
				spawn: false
			}
		},

		/**
		 * File copying
		 */
		cssLib: {
			files: grunt.fabConfig.source + '/css/lib/**/*.css',
			tasks: [
				'clean:cssLib',
				'copy:cssLib'
			]
		},
		jsLib: {
			files: grunt.fabConfig.source + '/js/lib/**/*.js',
			tasks: [
				'clean:jsLib',
				'copy:jsLib'
			]
		},
		images: {
			files: grunt.fabConfig.source + '/img/**',
			tasks: [
				'clean:images',
				'copy:images'
			],
			options: {
				spawn: false
			}
		},
		fonts: {
			files: grunt.fabConfig.source + '/fonts/**',
			tasks: [
				'clean:fonts',
				'copy:fonts'
			],
			options: {
				spawn: false
			}
		}
	};
};
