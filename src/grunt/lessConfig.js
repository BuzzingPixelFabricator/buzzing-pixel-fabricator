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
    var lessFiles = {};

    var styleContents = '';

    if (grunt.file.exists('./fabCache/css/mixins/')) {
        grunt.file.delete('./fabCache/css/mixins/');
    }

    if (grunt.file.exists('./fabCache/css/reset/')) {
        grunt.file.delete('./fabCache/css/reset/');
    }

    if (grunt.file.exists('./fabCache/css/other/')) {
        grunt.file.delete('./fabCache/css/other/');
    }

    grunt.file.mkdir('./fabCache/css/mixins');
    grunt.file.mkdir('./fabCache/css/reset');
    grunt.file.mkdir('./fabCache/css/other');

    // Get the contents of the style.less file
    styleContents = grunt.file.read(__dirname + '/../css/style.less');

    // Run replacements
    styleContents = styleContents.replace(
        /{assetsSource}/g,
        '../../' + grunt.fabConfig.source
    );

    // Write the style.less file to the cache directory
    grunt.file.write('./fabCache/css/style.less', styleContents);

    // Add primary source
    lessFiles[primaryCssFile] = ['./fabCache/css/style.less'];

    // Get any npm fab build css
    grunt.file.expand("./node_modules/*").forEach(function(dir) {
        // Get the module's package.json
        var jsonLoc = dir + '/package.json';

        // Parse the json
        var json = grunt.file.readJSON(jsonLoc);

        // Files
        var files;

        // Set the folder type initially
        var folder = 'other';

        // Check if there is a fabricatorBuild property
        if (! json.fabricatorCssBuild ||
            grunt.fabConfig.disabledModules.indexOf(json.name) > -1
        ) {
            return;
        }

        if (json.type === 'mixins' || json.type === 'reset') {
            folder = json.type;
        }

        // Set the files to the variable
        files = json.fabricatorCssBuild.files;

        // Iterate through files
        files.forEach(function(cssFileCandidate) {
            // Add the directory to the path
            var cssFileCandidateFull = dir + '/' + cssFileCandidate;

            // If the file exists, add it to the jsFiles array
            if (grunt.file.exists(cssFileCandidateFull)) {
                grunt.file.copy(
                    cssFileCandidateFull,
                    './fabCache/css/' + folder + '/' + cssFileCandidate
                );
            }
        });
    });

    // Check if there are any build files from project file
    if (grunt.fabConfig.lessBuild.length) {
        // Loop through the build files array
        grunt.fabConfig.lessBuild.forEach(function(i) {
            // Push the file into the compile array
            lessFiles[primaryCssFile].push(i);
        });
    }

    // Check if there are individual less files
    if (Object.keys(grunt.fabConfig.lessFiles).length) {
        // Loop through the individual files
        for (var key in grunt.fabConfig.lessFiles) {
            // Add individual Less file to the array to be compiled
            lessFiles[grunt.fabConfig.assets + '/css/' + key] = grunt.fabConfig.lessFiles[key];
        }
    }

    // Look for Less lib files
    grunt.file.expand(grunt.fabConfig.source + '/css/lib/**/*.less').forEach(function(file) {
        // Remove the path from the bundle name
        var fileName = file.replace(grunt.fabConfig.source + '/css/lib/', '');

        // Remove .less and replace with .css
        fileName = fileName.split('.');
        fileName.pop();
        fileName.push('css');
        fileName = fileName.join('.');

        // Make sure this is a file and not a directory
        if (grunt.file.isFile(file)) {
            // Add the file to less files
            lessFiles[grunt.fabConfig.assets + '/css/lib/' + fileName] = file;
        }
    });

    // Set grunt config for less
    grunt.fabInitConfig.less = {
        development: {
            options: {
                compress: grunt.fabConfig.lessCompress,
                yuicompress: grunt.fabConfig.lessCompress,
                optimization: 2,
                plugins: [
                    require('less-plugin-glob')
                ]
            },
            files: lessFiles
        }
    };
};
