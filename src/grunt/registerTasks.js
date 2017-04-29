/* globals module */

module.exports = function(grunt) {
    // Register grunt compile task
    grunt.registerTask('compile', [
        'initialCleanup',
        'copy',
        'less',
        'uglify',
        'notify:less',
        'notify:uglify'
    ]);

    // Register default task
    grunt.registerTask('default', [
        'compile',
        'browserSync',
        'watch'
    ]);
};
