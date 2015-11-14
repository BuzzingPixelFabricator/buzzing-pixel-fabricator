module.exports = function(grunt) {
	grunt.initConfig({
		browserSync: {
			bsFiles: {
				src: [
					'public_html/assets/css/style.min.css',
					'public_html/assets/js/lib/*.js',
					'public_html/assets/js/*.js',
					'system/user/templates/default_site/*/*.*'
				]
			},
			options: {
				watchTask: true,
				proxy: 'https://fab.dev',
				ghostMode: {
					clicks: false,
					forms: false,
					scroll: false,
					links: false
				},
				open: 'external',
				notify: false
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2,
					imports: {
						reference: [
							'base/variables.less',
							'config/variables.less',
							'base/mixins.less',
							'config/mixins.less'
						]
					}
				},
				files: {
					'public_html/assets/css/style.min.css': [
						'public_html/assetsSource/css/build/*.less',
						'public_html/assetsSource/css/build/*.css',
						'public_html/assetsSource/css/fab.less'
					]
				}
			}
		},
		uglify: {
			build: {
				options: {
					sourceMap: true
				},
				files: {
					'public_html/assets/js/script.min.js': [
						'public_html/assetsSource/js/fab.js',
						'public_html/assetsSource/js/controller.js',
						'public_html/assetsSource/js/build/*.js',
						'public_html/assetsSource/js/ready.js'
					]
				}
			}
		},
		jshint: {
			files: [
				'public_html/assetsSource/js/*.js',
				'public_html/assetsSource/js/build/*.js'
			],
			options: {
				jshintrc: true
			}
		},
		jscs: {
			src: [
				'public_html/assetsSource/js/*.js',
				'public_html/assetsSource/js/build/*.js'
			],
			options: {
				config: '.jscs.json'
			}
		},
		watch: {
			styles: {
				files: [
					'public_html/assetsSource/css/*.less',
					'public_html/assetsSource/css/*/*.less',
					'public_html/assetsSource/css/*/*.css'
				],
				tasks: [
					'less'
				],
				options: {
					spawn: false
				}
			},
			javascript: {
				files: [
					'public_html/assetsSource/js/*.js',
					'public_html/assetsSource/js/*/*.js'
				],
				tasks: [
					'uglify'
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

	grunt.loadNpmTasks('assemble-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', [
		'less',
		'uglify',
		'browserSync',
		'watch'
	]);

	grunt.registerTask('compile', [
		'less',
		'uglify'
	]);
};