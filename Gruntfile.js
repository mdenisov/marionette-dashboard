module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Task configuration.
		clean: {
			dist: ['dist']
		},
		requirejs: {
			release: {
				options: {
					mainConfigFile: "app/config.js",
					generateSourceMaps: true,
					include: ["main"],
					out: "dist/<%= pkg.name %>.min.js",
					optimize: "uglify2",

					// Since we bootstrap with nested `require` calls this option allows
					// R.js to find them.
					findNestedDependencies: true,

					// Include a minimal AMD implementation shim.
					name: "almond",

					// Setting the base url to the distribution directory allows the
					// Uglify minification process to correctly map paths for Source
					// Maps.
					baseUrl: "dist/app",

					// Wrap everything in an IIFE.
					wrap: true,

					// Do not preserve any license comments when working with source
					// maps.  These options are incompatible.
					preserveLicenseComments: false
				}
			}
		},
//		copy: {
//			release: {
//				files: [
//					{ src: "app/**", dest: "dist/" },
//					{ src: "vendor/**", dest: "dist/" },
//					{ src: "assets/css/*.css", dest: "dist/" }
//				]
//			}
//		},
		copy: {
			fonts: {
				expand: true,
				src: '**',
				cwd: 'assets/fonts',
				dest: 'dist/fonts/'
			},
			css: {
				expand: true,
				src: '**',
				cwd: 'assets/css',
				dest: 'dist/css/'
			},
			vendor: {
				expand: true,
				src: 'vendor/**/*.js',
				dest: 'dist/'
			},
			app: {
				expand: true,
				src: 'app/**/*.js',
				dest: 'dist/'
			}
		},
		compress: {
			release: {
				options: {
					archive: "dist/<%= pkg.name %>.min.js.gz"
				},

				files: ["dist/<%= pkg.name %>.min.js"]
			}
		},
		jsdoc : {
			dist : {
				src: ['app/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		cssmin: {
			release: {
				files: {
					"dist/css/<%= pkg.name %>.min.css": ["dist/css/<%= pkg.name %>.css"]
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
	require('time-grunt')(grunt);

	grunt.registerTask('backup', ['copy:fonts', 'copy:css', 'copy:vendor', 'copy:app']);

	// JS distribution task.
	grunt.registerTask('dist-js', ['concat', 'uglify']);

	// CSS distribution task.
	grunt.registerTask('less-compile', ['less:compileCore']);
	grunt.registerTask('dist-css', ['cssmin:release']);

	// Default task.
//	grunt.registerTask('default', ['clean', 'copy:release', 'dist-css', 'dist-js']);
	grunt.registerTask('default', ['clean', 'backup', 'dist-css']);

};
