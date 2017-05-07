/*----------------------------------------------------------------------------*\
 # Copyright 2017, BuzzingPixel, LLC

 # This program is free software: you can redistribute it and/or modify
 # it under the terms of the Apache License 2.0.
 # http://www.apache.org/licenses/LICENSE-2.0
 \*----------------------------------------------------------------------------*/

/* globals module */

module.exports = function(grunt) {
    // Set up primary CSS file
    var primaryCssFile = grunt.fabConfig.assets + '/css/style.min.css';
    var sassFiles = [];
    var otherSassFiles = {};
    var npmMixins = [];
    var npmReset = [];
    var npmOther = [];
    var styleContents = '';

    // Get any npm fab build css
    grunt.file.expand("./node_modules/*").forEach(function(dir) {
        // Get the module's package.json
        var jsonLoc = dir + '/package.json';

        // Parse the json
        var json = grunt.file.readJSON(jsonLoc);

        // Files
        var files;

        // Set the folder type initially
        var type = 'other';

        // Check if there is a fabricatorBuild property
        if (! json.fabricatorScssBuild ||
            grunt.fabConfig.disabledModules.indexOf(json.name) > -1
        ) {
            return;
        }

        if (json.fabricatorScssBuild.type === 'mixins' ||
            json.fabricatorScssBuild.type === 'reset'
        ) {
            type = json.fabricatorScssBuild.type;
        }

        // Set the files to the variable
        files = json.fabricatorScssBuild.files;

        // Iterate through files
        files.forEach(function(cssFileCandidate) {
            // Add the directory to the path
            var cssFileCandidateFull = dir + '/' + cssFileCandidate;
            cssFileCandidateFull = cssFileCandidateFull.slice(2, cssFileCandidateFull.length);

            // Check the type
            if (type === 'mixins') {
                npmMixins.push(cssFileCandidateFull);
            } else if (type === 'reset') {
                npmReset.push(cssFileCandidateFull);
            } else {
                npmOther.push(cssFileCandidateFull);
            }
        });
    });

    // Now put our items into the primary compile array
    if (npmMixins.length) {
        npmMixins.forEach(function(i) {
            sassFiles.push(i);
        });
    }

    if (npmReset.length) {
        npmReset.forEach(function(i) {
            sassFiles.push(i);
        });
    }

    if (npmOther.length) {
        npmReset.forEach(function(i) {
            sassFiles.push(i);
        });
    }

    // Check for user variables
    grunt.file.expand(grunt.fabConfig.source + '/css/vars/**/*.scss').forEach(function(file) {
        sassFiles.push(file);
    });

    // Check for user mixins
    grunt.file.expand(grunt.fabConfig.source + '/css/mixins/**/*.scss').forEach(function(file) {
        sassFiles.push(file);
    });

    // Check for reset
    if (grunt.file.exists('./' + grunt.fabConfig.source + '/css/reset.scss')) {
        sassFiles.push(grunt.fabConfig.source + '/css/reset.scss');
    }

    // Check if there are any build files from project file
    if (grunt.fabConfig.sassBuild.length) {
        // Loop through the build files array
        grunt.fabConfig.sassBuild.forEach(function(i) {
            // Push the file into the compile array
            sassFiles.push(i);
        });
    }

    // Check for user scss files everywhere else
    grunt.file.expand(grunt.fabConfig.source + '/css/**/*.scss').forEach(function(file) {
        // Only add the file if it's not already in the array
        // and it's not the user's primary stylesheet
        if (
            sassFiles.indexOf(file) === -1 &&
            file !== grunt.fabConfig.source + '/css/style.scss'
        ) {
            sassFiles.push(file);
        }
    });

    // Now add style.scss
    if (grunt.file.exists('./' + grunt.fabConfig.source + '/css/style.scss')) {
        sassFiles.push(grunt.fabConfig.source + '/css/style.scss');
    }

    // Check if there are individual sass files
    if (Object.keys(grunt.fabConfig.sassFiles).length) {
        // Loop through the individual files
        for (var key in grunt.fabConfig.sassFiles) {
            // Add individual Sass file to the array to be compiled
            otherSassFiles[grunt.fabConfig.assets + '/css/' + key] = grunt.fabConfig.sassFiles[key];
        }
    }

    // Look for Sass lib files
    grunt.file.expand(grunt.fabConfig.source + '/css/lib/**/*.scss').forEach(function(file) {
        // Remove the path from the bundle name
        var fileName = file.replace(grunt.fabConfig.source + '/css/lib/', '');

        // Remove .scss and replace with .css
        fileName = fileName.split('.');
        fileName.pop();
        fileName.push('css');
        fileName = fileName.join('.');

        // Make sure this is a file and not a directory
        if (grunt.file.isFile(file)) {
            // Add the file to sass files
            otherSassFiles[grunt.fabConfig.assets + '/css/lib/' + fileName] = file;
        }
    });

    // Set the style contents
    sassFiles.forEach(function(i) {
        styleContents += "@import '../../" + i + "';";
        styleContents += "\n";
    });

    // Write the style.scss file to the cache directory
    grunt.file.write('./fabCache/css/style.scss', styleContents);

    // Add the files to the object
    otherSassFiles[primaryCssFile] = './fabCache/css/style.scss';

    // Set grunt config for sass
    grunt.fabInitConfig.sass = {
        development: {
            options: {
                style: grunt.fabConfig.sassCompress ? 'compressed' : 'expanded'
            },
            files: otherSassFiles
        }
    };

    console.log(grunt.fabInitConfig.sass);
};
