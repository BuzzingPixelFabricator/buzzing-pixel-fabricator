/* globals module */

module.exports = function(grunt) {
    // Register initial cleanup task
    grunt.registerTask('criticalCleanup', function() {
        // Delete Critical CSS files
        if (grunt.file.exists(grunt.fabConfig.critical.destination)) {
            grunt.file.delete(grunt.fabConfig.critical.destination);
        }
    });
};
