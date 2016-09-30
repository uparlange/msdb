module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');
	
    grunt.initConfig({
		pkg:pkg,
        clean: {
            dist: ['dist'],
			babel: ['dist/src/js/*.babel.js']
        },
		jshint: {
			options: {
				esversion: 6
			},
			classes: ['js/*.js']
        },
		babel: {
			options: {
				sourceMap: false
			},
			transform: {
				files: [{
					expand: true,
					cwd: 'js/',
					src: ['*.js'],
					dest: 'dist/src/js/',
					ext: '.babel.js'
				}]
			}
		},
        uglify: {
            js: {
				files: [{
					expand: true,
					cwd: 'dist/src/js/',
					src: ['*.babel.js'],
					dest: 'dist/src/js/',
					ext: '.js'
				}]
            }
        },
        htmlmin: {
            templates: {
				options: {
					caseSensitive:true,
					collapseWhitespace: true
				},
                files: [{
                    expand: true,
                    cwd: 'html',
                    src: '**/*.html',
                    dest: 'dist/src/html'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
				rebase:false
            },
			target: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css'],
					dest: 'dist/src/css',
					ext: '.css'
				}]
			}
        },
		copy: {
			data: {
				cwd: 'data',
                src: '**/*',
                dest: 'dist/src/data',
                expand: true
			},
			images: {
				cwd: 'images',
                src: '**/*',
                dest: 'dist/src/images',
                expand: true
			}
        }
    });

	grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('release', ['clean:dist', 'jshint', 'babel', 'uglify', 'clean:babel', 'htmlmin', 'cssmin', 'copy']);
};