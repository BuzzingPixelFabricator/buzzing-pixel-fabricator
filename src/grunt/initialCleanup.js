/*------------------------------------------------------------------------------
Copyright 2017, BuzzingPixel, LLC

This program is free software: you can redistribute it and/or modify
it under the terms of the Apache License 2.0.
http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/

/* globals module */

module.exports = function(grunt) {
    // Register initial cleanup task
    grunt.registerTask('initialCleanup', function() {
        // Delete JS files
        if (grunt.file.exists(grunt.fabConfig.assets + '/js/')) {
            grunt.file.delete(grunt.fabConfig.assets + '/js/');
        }

        // Delete CSS files
        if (grunt.file.exists(grunt.fabConfig.assets + '/css/')) {
            grunt.file.delete(grunt.fabConfig.assets + '/css/');
        }

        // Delete images
        if (grunt.file.exists(grunt.fabConfig.assets + '/img/')) {
            grunt.file.delete(grunt.fabConfig.assets + '/img/');
        }

        // Delete font files
        if (grunt.file.exists(grunt.fabConfig.assets + '/fonts/')) {
            grunt.file.delete(grunt.fabConfig.assets + '/fonts/');
        }
    });
};
