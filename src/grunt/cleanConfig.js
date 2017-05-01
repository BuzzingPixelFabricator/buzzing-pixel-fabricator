/*----------------------------------------------------------------------------*\
    # Copyright 2017, BuzzingPixel, LLC

    # This program is free software: you can redistribute it and/or modify
    # it under the terms of the Apache License 2.0.
    # http://www.apache.org/licenses/LICENSE-2.0
\*----------------------------------------------------------------------------*/

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
