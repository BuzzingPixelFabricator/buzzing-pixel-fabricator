/*----------------------------------------------------------------------------*\
    # Copyright 2017, BuzzingPixel, LLC

    # This program is free software: you can redistribute it and/or modify
    # it under the terms of the Apache License 2.0.
    # http://www.apache.org/licenses/LICENSE-2.0
\*----------------------------------------------------------------------------*/

/* globals module, __dirname */

module.exports = function(grunt) {
    // Register task to configure sass
    grunt.registerTask('configureSass', function() {
        // Configure Less
        require(__dirname + '/sassConfig.js')(grunt);
    });

    // Register critical css task
    grunt.registerTask('criticalCss', [
        'criticalCleanup',
        'critical'
    ]);

    // Register grunt compile task
    grunt.registerTask('compile', [
        'initialCleanup',
        'copy',
        grunt.fabConfig.preprocessor,
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
