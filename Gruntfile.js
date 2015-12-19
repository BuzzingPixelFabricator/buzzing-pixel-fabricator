module.exports = function(grunt) {
	var projectFile = grunt.file.readJSON('project.json'),
		watch = projectFile.watch,
		root = projectFile.root,
		assetsPath = root + '/' + projectFile.assets,
		assetsSource = projectFile.source,
		conf = {
			root: root,
			assetsPath: assetsPath,
			assetsSource: assetsSource,
			bsFiles: {
				src: [
					assetsPath + '/css/style.min.css',
					assetsPath + '/js/lib/*.js',
					assetsPath + '/js/*.js'
				]
			},
			bsOptions: {
				watchTask: true,
				proxy: projectFile.proxy,
				ghostMode: {
					clicks: false,
					forms: false,
					scroll: false,
					links: false
				},
				open: 'local',
				notify: false
			},
			lessCompress: projectFile.lessCompress,
			lessFiles: {},
			jsFiles: {}
		};

	// Configure additional watch files
	conf.bsFiles.src = watch.concat(conf.bsFiles.src);

	// Configure proxy
	if (projectFile.proxy === false) {
		conf.bsOptions.open = false;
	}

	// Configure less files
	conf.lessFiles[assetsPath + '/css/style.min.css'] = [
		assetsSource + '/css/build/*.less',
		assetsSource + '/css/build/*.css',
		assetsSource + '/css/fab.less'
	];

	if (projectFile.lessBuild.length) {
		projectFile.lessBuild.forEach(function(i) {
			conf.lessFiles[assetsPath + '/css/style.min.css'].push(
				assetsSource + '/' + i
			);
		});
	}

	if (Object.keys(projectFile.lessFiles).length) {
		for (var key in projectFile.lessFiles) {
			conf.lessFiles[assetsPath + '/' + key] =
				assetsSource + '/' + projectFile.lessFiles[key];
		}
	}

	// Configure JS files
	conf.jsFiles[assetsPath + '/js/script.min.js'] = [
		assetsSource + '/js/fab.js',
		assetsSource + '/js/base/*.js',
		assetsSource + '/js/controller.js',
		assetsSource + '/js/build/*.js'
	];

	if (projectFile.jsBuild.length) {
		projectFile.jsBuild.forEach(function(i) {
			conf.jsFiles[assetsPath + '/js/script.min.js'].push(
				assetsSource + '/' + i
			);
		});
	}

	conf.jsFiles[assetsPath + '/js/script.min.js'].push(
		assetsSource + '/js/ready.js'
	);

	if (Object.keys(projectFile.jsFiles).length) {
		for (var key in projectFile.jsFiles) {
			conf.jsFiles[assetsPath + '/' + key] =
				assetsSource + '/' + projectFile.jsFiles[key];
		}
	}

	grunt.initConfig({
		conf: conf,
		projectFile: projectFile,
		browserSync: {
			bsFiles: conf.bsFiles,
			options: conf.bsOptions
		},
		notify: {
			less: {
				options: {
					title: 'CSS',
					message: 'CSS compiled successfully'
				}
			},
			uglify: {
				options: {
					title: 'Javascript',
					message: 'Javascript compiled successfully'
				}
			}
		},
		less: {
			development: {
				options: {
					compress: conf.lessCompress,
					yuicompress: conf.lessCompress,
					optimization: 2
				},
				files: conf.lessFiles
			}
		},
		uglify: {
			build: {
				options: {
					sourceMap: true
				},
				files: conf.jsFiles
			}
		},
		jshint: {
			files: [
				'<%= conf.assetsSource %>/js/*.js',
				'<%= conf.assetsSource %>/js/base/*.js',
				'<%= conf.assetsSource %>/js/build/*.js'
			],
			options: {
				jshintrc: true
			}
		},
		jscs: {
			src: [
				'<%= conf.assetsSource %>/js/*.js',
				'<%= conf.assetsSource %>/js/base/*.js',
				'<%= conf.assetsSource %>/js/build/*.js'
			],
			options: {
				config: '.jscs.json'
			}
		},
		watch: {
			styles: {
				files: [
					'<%= conf.assetsSource %>/css/*.less',
					'<%= conf.assetsSource %>/css/*/*.less',
					'<%= conf.assetsSource %>/css/*/*.css'
				],
				tasks: [
					'less',
					'notify:less'
				],
				options: {
					spawn: false
				}
			},
			javascript: {
				files: [
					'<%= conf.assetsSource %>/js/*.js',
					'<%= conf.assetsSource %>/js/*/*.js'
				],
				tasks: [
					'uglify',
					'notify:uglify'
				],
				options: {
					spawn: false
				}
			},
			jshint: {
				files: [
					'<%= jshint.files %>'
				],
				tasks: [
					'jshint'
				],
				options: {
					spawn: false
				}
			},
			jscs: {
				files: [
					'<%= jscs.src %>'
				],
				tasks: [
					'jscs'
				],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', [
		'less',
		'uglify',
		'notify:less',
		'notify:uglify',
		'browserSync',
		'watch'
	]);

	grunt.registerTask('compile', [
		'less',
		'uglify'
	]);
};
