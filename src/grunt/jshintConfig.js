/* globals module */

module.exports = function(grunt) {
    // Set grunt config for jshint
    grunt.fabInitConfig.jshint = {
        files: [
            grunt.fabConfig.source + '/js/**/*.js',
            '!' + grunt.fabConfig.source + '/js/lib/**/*.js'
        ],
        options: {
            jshintrc: true
        }
    };
};
