/* globals module */

module.exports = function(grunt) {
	// Set grunt config for notify
	grunt.fabInitConfig.clean = {
		images: grunt.fabConfig.assets + '/img/**/*',
		fonts: grunt.fabConfig.assets + '/fonts/**/*'
	};
};
