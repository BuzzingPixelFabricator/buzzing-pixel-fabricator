/* globals module */

module.exports = function(grunt) {
    // Set grunt config for jscs
    grunt.fabInitConfig.jscs = {
        src: [
            grunt.fabConfig.source + '/js/**/*.js',
            '!' + grunt.fabConfig.source + '/js/lib/**/*.js'
        ],
        options: {
            config: '.jscs.json'
        }
    };
};
