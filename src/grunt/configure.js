/*----------------------------------------------------------------------------*\
    # Copyright 2017, BuzzingPixel, LLC

    # This program is free software: you can redistribute it and/or modify
    # it under the terms of the Apache License 2.0.
    # http://www.apache.org/licenses/LICENSE-2.0
\*----------------------------------------------------------------------------*/

/* globals module, __dirname */

module.exports = function(grunt) {
    // Get base project file
    var baseProjectFile = grunt.file.readJSON(
        __dirname + '/baseProjectFile.json'
    );

    // This projects project file
    var projectFile = {};

    // Get project file
    if (grunt.file.exists('./project.json')) {
        projectFile = grunt.file.readJSON('./project.json');
    }

    // Set project file overrides var
    var projectFileOverrides = {};

    // Set config variable
    var config = {};

    // Get project file overrides if they exist
    if (grunt.file.exists('./projectOverrides.json')) {
        projectFileOverrides = grunt.file.readJSON('./projectOverrides.json');
    }

    // Loop through baseProjectFile, set properties based on order of succession
    for (var key in baseProjectFile) {
        if (projectFileOverrides[key] !== undefined) {
            config[key] = projectFileOverrides[key];
        } else if (projectFile[key] !== undefined) {
            config[key] = projectFile[key];
        } else {
            config[key] = baseProjectFile[key];
        }
    }

    // Make sure the fabCache directory exists
    grunt.file.mkdir('./fabCache');
    grunt.file.write('./fabCache/.gitignore', '/css/*\n');

    grunt.fabConfig = config;
};
