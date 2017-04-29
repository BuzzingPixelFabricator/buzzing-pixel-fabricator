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

    grunt.fabConfig = config;
};
