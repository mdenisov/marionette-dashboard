module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Task configuration.
		clean: {
			dist: ['dist']
		},
        copy: {
            assets: {
                expand: true,
                src: ['assets/**', '!assets/less/**'],
                dest: 'dist/'
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
		compress: {
			release: {
				options: {
                    mode: 'gzip'
				},
				files: [
                    {expand: true, src: ['dist/<%= pkg.name %>.min.js'], ext: '.gz.js'}
                ]
			}
		},
		jsdoc : {
            release : {
				src: ['app/**/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		cssmin: {
			release: {
				files: {
					"dist/assets/css/<%= pkg.name %>.min.css": ["dist/assets/css/<%= pkg.name %>.css"]
				}
			}
		},
        processhtml: {
            release: {
                files: {
                    "dist/index.html": ["index.html"]
                }
            }
        }
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
	require('time-grunt')(grunt);

	grunt.registerTask('backup', ['copy:assets', 'copy:vendor', 'copy:app']);

	// JS distribution task.
	grunt.registerTask('dist-js', ['requirejs', 'compress']);

	// CSS distribution task.
	grunt.registerTask('less-compile', ['less:compileCore']);
	grunt.registerTask('dist-css', ['cssmin']);

	// Default task.
//	grunt.registerTask('default', ['clean', 'copy:release', 'dist-css', 'dist-js']);
	grunt.registerTask('default', ['clean', 'backup', 'dist-css', 'dist-js', 'processhtml']);

};
