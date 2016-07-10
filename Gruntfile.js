/* globals module */

module.exports = function(grunt) {
	// Set global items
	grunt.fabConfig = {};
	grunt.fabInitConfig = {};

	// Set up configuration
	require('./fab/grunt/configure.js')(grunt);

	// Load NPM tasks
	require('./fab/grunt/loadNpmTasks.js')(grunt);

	// Create initial clean up task
	require('./fab/grunt/initialCleanup.js')(grunt);

	// Configure clean
	require('./fab/grunt/cleanConfig.js')(grunt);

	// Configure copy
	require('./fab/grunt/copyConfig.js')(grunt);

	// Configure Less
	require('./fab/grunt/lessConfig.js')(grunt);

	// Configure javascript
	require('./fab/grunt/javascriptConfig.js')(grunt);

	// Configure jshint
	require('./fab/grunt/jshintConfig.js')(grunt);

	// Configure jscs
	require('./fab/grunt/jscsConfig.js')(grunt);

	// Configure notify
	require('./fab/grunt/notifyConfig.js')(grunt);

	// Configure browser sync
	require('./fab/grunt/browserSyncConfig.js')(grunt);

	// Configure watch
	require('./fab/grunt/watchConfig.js')(grunt);

	// Initialze grunt config
	grunt.initConfig(grunt.fabInitConfig);

	// Register tasks
	require('./fab/grunt/registerTasks.js')(grunt);
};
