module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');
	
    grunt.initConfig({
		pkg:pkg,
        clean: {
            dist: ['dist'],
			babel: ['dist/js/*.babel.js'],
			index_temp: ['dist/index_temp.html']
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
			index_temp:{
				src: 'dist/index_temp.html',
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
			package: {
				src:'package.json',
				dest:'dist/package.json'
			},
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
			index: {
				src:'index.html',
				dest:'dist/index_temp.html',
				options: {
                    process: function (content, srcpath)
                    {
                        return content.replace(/APP_VERSION/g, pkg.version);
                    }
                }
			}
        },
		imagemin: {
			options: {
				optimizationLevel : 3
			},
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.*'],
					dest: 'dist/images/'
				}]
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
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	
	grunt.registerTask('prepare', 'prepare', function()
	{
		const htmlparser = require('htmlparser2');
		const fs = require('fs');
		
		const uglify = {};
		const cssmin = {};
		const copy = {};
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
						dependencies = uglify;
						break;
					case 'link' : 
						attribute = 'href'; 
						dependencies = cssmin;
						break;
				}
				if(attributes[attribute] !== undefined && attributes[attribute].indexOf('node_modules') !== -1)
				{
					const url = attributes[attribute];
					const begin = url.lastIndexOf("/") + 1;
					const name = url.substring(begin);
					if(name.indexOf('.min') !== -1)
					{
						dependencies = copy;
					}
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
			copy:copy
		});
		
		grunt.config.merge({
			uglify:uglify
		});
		
		grunt.config.merge({
			cssmin:cssmin
		});
	});
	
	grunt.registerTask('manifest', 'manifest', function()
	{
		const fs = require('fs');
		const path = 'dist/manifest.cache';
		const baseDir = 'dist';
		
		let content = '';
		
		const readDir = function(dir)
		{
			fs.readdirSync(dir).forEach((item, index, array) =>
			{
				if(item !== "." && item !== "..")
				{
					const path = dir + '/' + item;
					const stats = fs.statSync(path);
					if(stats.isDirectory())
					{
						readDir(path);
					}
					else
					{
						content += path.replace(baseDir + '/', '') + '\n';
					}
				}
			});
		};

		content = 'CACHE MANIFEST\n';
		content += '# ' + pkg.version + '\n';
		content += 'CACHE:\n';
		
		readDir(baseDir);
		
		content += 'NETWORK:\n';
		content += '*\n';
		content += 'FALLBACK:\n';
		
		fs.writeFileSync(path, content);
	});	

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('theme', ['sass']);
	grunt.registerTask('cache', ['manifest']);
	grunt.registerTask('default', ['clean:dist', 'jshint', 'prepare', 'copy', 'imagemin', 'babel', 'uglify', 'clean:babel', 'htmlmin', 'clean:index_temp', 'sass', 'cssmin', 'manifest']);
};