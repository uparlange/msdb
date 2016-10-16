module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');
	
    grunt.initConfig({
		pkg:pkg,
        clean: {
            dist: ['dist'],
			babel: ['dist/js/*.babel.js']
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
			classes: {
				files: [{
					expand: true,
					cwd: 'js/',
					src: ['*.js'],
					dest: 'dist/js/',
					ext: '.babel.js'
				}]
			}
		},
        uglify: {
            classes: {
				files: [{
					expand: true,
					cwd: 'dist/js/',
					src: ['*.babel.js'],
					dest: 'dist/js/',
					ext: '.js'
				}]
            }
        },
        htmlmin: {
			options: {
				caseSensitive:true,
				removeComments: true,
				collapseWhitespace: true
			},
			index:{
				src: 'index.html',
                dest: 'dist/index.html'
			},
            templates: {
                files: [{
                    expand: true,
                    cwd: 'html',
                    src: '**/*.html',
                    dest: 'dist/html'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
				rebase:false
            },
			css: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
        },
		copy: {
			material_design_icons: {
                cwd: 'node_modules/material-design-icons/iconfont',
                src: '**/*',
                dest: 'dist/node_modules/material-design-icons/iconfont',
                expand: true
            },
			photoswipe_default_skin: {
                cwd: 'node_modules/photoswipe/dist/default-skin',
                src: '**/*',
                dest: 'dist/node_modules/photoswipe/dist/default-skin',
                expand: true
            },
			data: {
				cwd: 'data',
                src: '**/*',
                dest: 'dist/data',
                expand: true
			},
			images: {
				cwd: 'images',
                src: '**/*',
                dest: 'dist/images',
                expand: true
			}
        },
		sass: {
			options: {
				sourcemap:"none"
			},
			theme: {
				files: {
					'css/theme.css': 'theme/theme.scss'
				}
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
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	grunt.registerTask('npms', 'npms', function()
	{
		const htmlparser = require('htmlparser2');
		const fs = require('fs');
		
		const scripts = {};
		const css = {};
		const parser = new htmlparser.Parser(
		{
			onopentag: function(tagname, attributes)
			{
				let attribute = null;
				let dependencies = null;
				switch(tagname)
				{
					case 'script' :
						attribute = 'src';
						dependencies = scripts;
						break;
					case 'link' :
						attribute = 'href';
						dependencies = css;
						break;
				}
				if(attributes[attribute] !== undefined && attributes[attribute].indexOf('node_modules') !== -1)
				{
					const url = attributes[attribute];
					const begin = url.lastIndexOf("/") + 1;
					const end =  url.indexOf(".", begin);
					const name = url.substring(begin, end) + "_" + tagname;
					dependencies[name] = {
						src:url,
						dest:'dist/'+url
					}
				}
			}
		}, 
		{
			decodeEntities: true
		});
		parser.write(fs.readFileSync('index.html', 'utf8'));
		parser.end();

		grunt.config.merge({
			uglify:scripts
		});
		
		grunt.config.merge({
			cssmin:css
		});
	});

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('theme', ['sass']);
	grunt.registerTask('default', ['clean:dist', 'jshint', 'copy', 'npms', 'babel', 'uglify', 'clean:babel', 'htmlmin', 'sass', 'cssmin']);
};