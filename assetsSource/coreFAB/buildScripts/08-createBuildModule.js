/*============================================================================*\
	DO NOT EDIT THIS FILE. THIS IS A CORE FILE.
/*============================================================================*/

module.exports = function(grunt, vars) {
	// Grunt register createBuildModule task
	grunt.registerTask('module', function(type, name) {
		// Check the type argument
		if (type === undefined || (type !== 'build' && type !== 'compile')) {
			grunt.fail.fatal('Module type must be "build" or "compile"');
		}

		// Check the name argument
		if (name === undefined) {
			grunt.fail.fatal('Module name is required');
		}

		// Check if module already exists
		if (grunt.file.isDir(vars.assetsSource + '/modules/' + type + '/' + name)) {
			grunt.fail.fatal('A Module with that name already exists');
		}

		// Loop through the starter module files (including hidden files)
		grunt.file.expand([
			vars.assetsSource + '/coreFAB/moduleStarters/' + type + '/starter/**/*',
			vars.assetsSource + '/coreFAB/moduleStarters/' + type + '/starter/**/.*'
		]).forEach(function(file) {
			// Get the filename
			var fileName = file.replace(vars.assetsSource + '/coreFAB/moduleStarters/' + type + '/', '');

			// Replace starter with module name
			fileName = fileName.replace('starter', name);

			// Make sure this is a file and not a directory
			if (grunt.file.isFile(file)) {
				// Copy the file into place
				grunt.file.copy(
					file,
					vars.assetsSource + '/modules/' + type + '/' + fileName
				);
			}
		});
	});
};