/*------------------------------------------------------------------------------
Copyright 2017, BuzzingPixel, LLC

This program is free software: you can redistribute it and/or modify
it under the terms of the Apache License 2.0.
http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/

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
