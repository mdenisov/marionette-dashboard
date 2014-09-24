module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
            ' * Main Dashboard v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

		// Task configuration.
		clean: {
			dist: ['dist']
		},
		copy: {
			fonts: {
				expand: true,
				src: 'fonts/*',
				dest: 'dist/'
			},
			css: {
				expand: true,
				src: 'css/**/*.css',
				dest: 'dist/css'
			},
			js: {
				expand: true,
				src: 'js/**/*.js',
				dest: 'dist/js'
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['js/**/*.js'],
				dest: 'dist/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'js/main.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		jsdoc : {
			dist : {
				src: ['js/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		less: {
			compileCore: {
				options: {
//					strictMath: true,
//					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
				},
				files: {
					'css/<%= pkg.name %>.css': 'less/main.less'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: [
					'Android 2.3',
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24', // Firefox 24 is the latest ESR
					'Explorer >= 8',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6'
				]
			},
			core: {
				options: {
					map: true
				},
				src: 'css/<%= pkg.name %>.css'
			}
		},
		csslint: {
			options: {
				csslintrc: 'less/.csslintrc'
			},
			src: [
				'dist/css/main.css'
			]
		},
		cssmin: {
			combine: {
				files: {
					'dist/css/<%= pkg.name %>.css': ['css/**/*.css']
				}
			},
			minify: {
				expand: true,
				cwd: 'dist/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/css/',
				ext: '.min.css'
			}
		},
		usebanner: {
			options: {
				position: 'top',
				banner: '<%= banner %>'
			},
			files: {
				src: 'dist/css/*.css'
			}
		},
		watch: {
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src']
			},
			less: {
				files: 'less/*.less',
				tasks: 'less'
			}
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
	require('time-grunt')(grunt);

	// JS distribution task.
	grunt.registerTask('dist-js', ['concat', 'uglify']);

	// CSS distribution task.
	grunt.registerTask('less-compile', ['less:compileCore']);
	grunt.registerTask('dist-css', ['less-compile', 'autoprefixer', 'usebanner', 'cssmin']);

	// Default task.
	grunt.registerTask('default', ['clean', 'copy:fonts', 'dist-css', 'dist-js']);

};
