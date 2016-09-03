/* globals module */

module.exports = function(grunt) {
	// Set grunt config for notify
	grunt.fabInitConfig.notify = {
		less: {
			options: {
				title: 'CSS',
				message: 'CSS compiled successfully'
			}
		},
		uglify: {
			options: {
				title: 'JavaScript',
				message: 'JavaScript compiled successfully'
			}
		}
	};
};
