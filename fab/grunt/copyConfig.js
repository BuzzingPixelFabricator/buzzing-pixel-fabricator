/* globals module */

module.exports = function(grunt) {
	// Set grunt config for notify
	grunt.fabInitConfig.copy = {
		cssLib: {
			files: [{
				expand: true,
				cwd: grunt.fabConfig.source + '/css/lib/',
				src: '**.css',
				dest: grunt.fabConfig.assets + '/css/lib/'
			}]
		},
		jsLib: {
			files: [{
				expand: true,
				cwd: grunt.fabConfig.source + '/js/lib/',
				src: '**.js',
				dest: grunt.fabConfig.assets + '/js/lib/'
			}]
		},
		images: {
			files: [{
				expand: true,
				cwd: grunt.fabConfig.source + '/img/',
				src: '**',
				dest: grunt.fabConfig.assets + '/img/'
			}]
		},
		fonts: {
			files: [{
				expand: true,
				cwd: grunt.fabConfig.source + '/fonts/',
				src: '**',
				dest: grunt.fabConfig.assets + '/fonts/'
			}]
		}
	};
};
