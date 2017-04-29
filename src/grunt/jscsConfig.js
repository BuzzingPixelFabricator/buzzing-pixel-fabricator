/*------------------------------------------------------------------------------
Copyright 2017, BuzzingPixel, LLC

This program is free software: you can redistribute it and/or modify
it under the terms of the Apache License 2.0.
http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/

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
