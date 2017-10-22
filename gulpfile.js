'use strict';

// -------------------------------------------------
// DEPENDENCIES 
// -------------------------------------------------

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const htmlclean = require('gulp-htmlclean');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const runSequence = require('run-sequence');
const fs = require('fs');
const htmlparser = require('htmlparser2');
const mergeStream = require('merge-stream');
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const change = require('gulp-change');
const zip = require('gulp-zip');
const karma = require('karma');

// -------------------------------------------------
// VARIABLES
// -------------------------------------------------

const pkg = require('./package.json');
const resources = {
    copy4web: [],
    copy4desktop: [],
    js: [],
    css: [],
    html: [],
    image: []
};

// -------------------------------------------------
// TASKS
// -------------------------------------------------

// COMMON

gulp.task('clean-dist', () => {
    return del(['./dist']);
});

gulp.task('clean-tmp', () => {
    return del(['./dist/tmp']);
});

gulp.task('generate-manifest', (callback) => {
    const baseDir = './dist';
    const path = baseDir + '/manifest.cache';
    const readDir = (dir) => {
        fs.readdirSync(dir).forEach((item, index, array) => {
            if (item !== '.' && item !== '..') {
                const path = dir + '/' + item;
                const stats = fs.statSync(path);
                if (stats.isDirectory()) {
                    readDir(path);
                }
                else {
                    content += path.replace(baseDir + '/', '') + '\n';
                }
            }
        });
    };
    let content = '';
    content = 'CACHE MANIFEST\n';
    content += '# ' + pkg.version + '\n';
    content += 'CACHE:\n';
    readDir(baseDir);
    content += 'NETWORK:\n';
    content += '*\n';
    content += 'FALLBACK:\n';
    fs.writeFileSync(path, content);
    callback();
});

gulp.task('generate-release', () => {
    return gulp.src('dist/**/*')
        .pipe(zip(pkg.name + '-' + pkg.version + '.nw'))
        .pipe(gulp.dest('release'));
});

// IMAGES

gulp.task('add-image-resources', (callback) => {
    resources.image.push({
        src: './images/**/*',
        dest: './dist/images'
    });
    callback();
});

gulp.task('prepare-image-resources', (callback) => {
    runSequence('add-image-resources', callback);
});

gulp.task('optimize-image-resources', () => {
    const streams = mergeStream();
    resources.image.forEach((element, index, array) => {
        streams.add(gulp.src(element.src)
            .pipe(imagemin())
            .pipe(gulp.dest(element.dest)));
    });
    return streams;
});

// HTML

gulp.task('change-index', () => {
    const performChange = (content) => {
        return content.replace(/APP_VERSION/g, pkg.version);
    };
    return gulp.src('./index.html')
        .pipe(change(performChange))
        .pipe(gulp.dest('./dist/tmp'))
});

gulp.task('add-html-resources', (callback) => {
    // index
    resources.html.push({
        src: './dist/tmp/index.html',
        dest: './dist'
    });
    // templates
    resources.html.push({
        src: './html/**/*.html',
        dest: './dist/html'
    });
    callback();
});

gulp.task('prepare-html-resources', (callback) => {
    runSequence('change-index', 'add-html-resources', callback);
});

gulp.task('minify-html-resources', () => {
    const streams = mergeStream();
    resources.html.forEach((element, index, array) => {
        streams.add(gulp.src(element.src)
            .pipe(htmlclean())
            .pipe(gulp.dest(element.dest)));
    });
    return streams;
});

// CSS

gulp.task('generate-theme', () => {
    return gulp.src('./theme/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('add-css-resources', (callback) => {
    resources.css.push({
        src: './css/**/*.css',
        dest: './dist/css'
    });
    callback();
});

gulp.task('prepare-css-resources', (callback) => {
    runSequence('generate-theme', 'add-css-resources', callback);
});

gulp.task('minify-css-resources', () => {
    const streams = mergeStream();
    resources.css.forEach((element, index, array) => {
        streams.add(gulp.src(element.src)
            .pipe(cleanCSS())
            .pipe(gulp.dest(element.dest)));
    });
    return streams;
});

// JS

gulp.task('lint-js', () => {
    return gulp.src(['./js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('babel-js', () => {
    return gulp.src('./js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./dist/tmp/babel'));
});

gulp.task('add-js-resources', (callback) => {
    resources.js.push({
        src: './dist/tmp/babel/**/*.js',
        dest: './dist/js'
    });
    callback();
});

gulp.task('prepare-js-resources', (callback) => {
    runSequence('lint-js', 'babel-js', 'add-js-resources', callback);
});

gulp.task('minify-js-resources', () => {
    const streams = mergeStream();
    resources.js.forEach((element, index, array) => {
        streams.add(gulp.src(element.src)
            .pipe(uglify())
            .pipe(gulp.dest(element.dest)))
    });
    return streams;
});

// RESOURCES

gulp.task('prepare-node-modules', (callback) => {
    const urls = [];
    const parser = new htmlparser.Parser({
        onopentag: (tagname, attributes) => {
            let attribute = null;
            switch (tagname) {
                case 'script':
                    attribute = 'src';
                    break;
                case 'link':
                    attribute = 'href';
                    break;
            }
            if (attributes[attribute] !== undefined && attributes[attribute].indexOf('node_modules') !== -1) {
                const url = attributes[attribute];
                urls.push(url);
                const dest = 'dist/' + url.substring(0, url.lastIndexOf('/'));
                const begin = url.lastIndexOf('/') + 1;
                const name = url.substring(begin);
                if (name.indexOf('.min') !== -1) {
                    resources.copy4web.push({
                        src: url,
                        dest: dest
                    });
                } else if (attribute === 'src') {
                    resources.js.push({
                        src: url,
                        dest: dest
                    });
                } else if (attribute === 'href') {
                    resources.css.push({
                        src: url,
                        dest: dest
                    });
                }
            }
        }
    }, {
            decodeEntities: true
        });
    parser.write(fs.readFileSync('index.html', 'utf8'));
    parser.end();

    const addDependency = function (dependency) {
        const folder = './node_modules/' + dependency;

        resources.copy4desktop.push({
            src: folder + '/**/*',
            dest: './dist/node_modules/' + dependency
        });

        const pkg2 = require(folder + '/package.json');
        for (let dependency in pkg2.dependencies) {
            addDependency(dependency);
        }
    };

    const files = [];
    for (let dependency in pkg.dependencies) {
        let toAdd = true;
        urls.forEach(function (url) {
            if (url.indexOf('/' + dependency + '/') !== -1) {
                toAdd = false;
                return;
            }
        });
        if (toAdd) {
            addDependency(dependency);
        }
    }

    callback();
});

gulp.task('prepare-copy-resources', (callback) => {
    // package
    resources.copy4web.push({
        src: './package.json',
        dest: './dist'
    });
    // data
    resources.copy4web.push({
        src: './data/**/*',
        dest: './dist/data'
    });
    // material-design-icons
    resources.copy4web.push({
        src: './node_modules/material-design-icons/iconfont/**/*.{eot,woff2,woff,ttf}',
        dest: './dist/node_modules/material-design-icons/iconfont'
    });
    // photoswipe_default_skin
    resources.copy4web.push({
        src: './node_modules/photoswipe/dist/default-skin/**/*',
        dest: './dist/node_modules/photoswipe/dist/default-skin'
    });
    callback();
});

gulp.task('copy-web-resources', () => {
    const streams = mergeStream();
    resources.copy4web.forEach((element, index, array) => {
        streams.add(gulp.src(element.src)
            .pipe(gulp.dest(element.dest)));
    });
    return streams;
});

gulp.task('copy-desktop-resources', () => {
    const streams = mergeStream();
    resources.copy4desktop.forEach((element, index, array) => {
        streams.add(gulp.src(element.src)
            .pipe(gulp.dest(element.dest)));
    });
    return streams;
});

// TEST

gulp.task('test', function (callback) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, callback).start();
});

gulp.task('tdd', function (callback) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js'
    }, callback).start();
});

// MAIN

gulp.task('prepare-resources', (callback) => {
    runSequence(['prepare-copy-resources', 'prepare-node-modules', 'prepare-css-resources', 'prepare-html-resources', 'prepare-js-resources', 'prepare-image-resources'], callback);
});

gulp.task('manage-web-resources', (callback) => {
    runSequence(['copy-web-resources', 'minify-css-resources', 'minify-html-resources', 'minify-js-resources', 'optimize-image-resources'], callback);
});

gulp.task('build-web', (callback) => {
    runSequence('clean-dist', 'prepare-resources', 'manage-web-resources', 'clean-tmp', 'generate-manifest', callback);
});

gulp.task('build-desktop', (callback) => {
    runSequence('build-web', 'copy-desktop-resources', 'generate-release', callback);
});

gulp.task('tests', ['tdd']);

gulp.task('default', (callback) => {
    runSequence('build-web', callback);
});