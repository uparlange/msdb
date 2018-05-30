const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const htmlclean = require('gulp-htmlclean');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const fs = require('fs');
const htmlparser = require('htmlparser2');
const mergeStream = require('merge-stream');
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const change = require('gulp-change');
const zip = require('gulp-zip');

gulp.task('clean-dist', () => {
    return del(['./dist']);
});

gulp.task('lint-js', () => {
    return gulp.src(['./js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('babel-js', () => {
    return gulp.src('./js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./dist/tmp/js'));
});

gulp.task('optimize-js', () => {
    return gulp.src('./dist/tmp/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('generate-theme', () => {
    return gulp.src('./theme/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('optimize-css', () => {
    return gulp.src('./css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('optimize-html', () => {
    return gulp.src('./html/*.html')
        .pipe(htmlclean())
        .pipe(gulp.dest('./dist/html'));
});

gulp.task('optimize-images', () => {
    return gulp.src('./images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('manage-images', gulp.series('optimize-images'));

gulp.task('manage-html', gulp.series('optimize-html'));

gulp.task('manage-css', gulp.series('generate-theme', 'optimize-css'));

gulp.task('manage-js', gulp.series('lint-js', 'babel-js', 'optimize-js'));

gulp.task('manage-resources', gulp.parallel('manage-js', 'manage-css', 'manage-html', 'manage-images'));

gulp.task('default', gulp.series('clean-dist', 'manage-resources'));