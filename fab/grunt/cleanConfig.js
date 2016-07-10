/* globals module */

module.exports = function(grunt) {
	// Set grunt config for notify
	grunt.fabInitConfig.clean = {
		cssLib: grunt.fabConfig.assets + '/css/lib/**/*',
		jsLib: grunt.fabConfig.assets + '/js/lib/**/*',
		images: grunt.fabConfig.assets + '/img/**/*',
		fonts: grunt.fabConfig.assets + '/fonts/**/*'
	};
};
