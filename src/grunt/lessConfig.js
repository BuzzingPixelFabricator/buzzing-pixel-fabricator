/* globals module */

module.exports = function(grunt) {
    // Set up primary CSS file
    var primaryCssFile = grunt.fabConfig.assets + '/css/style.min.css';
    var lessFiles = {};

    // Add primary source
    lessFiles[primaryCssFile] = [
        grunt.fabConfig.source + '/css/style.less'
    ];

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
