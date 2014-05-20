/*
Gulpfile intended to start a new project from scratch
The author is @pwnjack
This file relies on bower
Remember to define dependencies in bower.json to grab the packages
*/

// define gulp
var gulp = require('gulp');

// define plug-ins
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var bowerFiles = require('gulp-bower-files');
var bowerSrc = require('gulp-bower-src');
var flatten = require('gulp-flatten');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var clean = require('gulp-clean');
var w3cjs = require('gulp-w3cjs');

// Define paths variables
var src_path = 'src';
var dest_path =  'public';

// Copy all files from /src, validate html files, and and push everything inside /public
gulp.task('files', function() {
	return gulp.src(src_path + '/*.*')
	.pipe(newer(dest_path))
	.pipe(filter('*.html'))
	.pipe(w3cjs())
	.pipe(filter('*.html').restore())
	.pipe(gulp.dest(dest_path))
	.pipe(notify("<%= file.relative %> pushed"));
});

// Compile less files in css, autoprefix them and notify when done. Ignore responsive.less because it's imported in style.less
gulp.task('styles', function() {
	return gulp.src([src_path + '/less/*.less', '!' + src_path + '/less/responsive.less'])
	.pipe(less())
	.pipe(autoprefixer('last 15 version', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest(dest_path + '/css'))
	.pipe(notify("<%= file.relative %> compiled"));
});

// Compile scripts and push in a single minimized file inside /public/js
gulp.task('scripts', function(){
	return gulp.src([src_path + '/scripts/plugins.js', src_path + '/scripts/**/*.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(dest_path + '/js'))
	.pipe(notify("Scripts task complete"));
});

// Images optimization, if cached skip
gulp.task('images', function() {
  	return gulp.src(src_path + '/images/**/*')
  	.pipe(newer('public/img'))
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(dest_path + '/img'))
    .pipe(notify("Images task complete"));
});

// grab vendor js files from bower_components, minify and push in /public
gulp.task('vendor-js', function() {
	bowerFiles()
	.pipe(flatten())
	.pipe(filter('*.js'))
	.pipe(uglify())
	.pipe(rename({
        suffix: ".min"
    }))
	.pipe(gulp.dest(dest_path + '/js/vendor'))
});

// grab vendor css files from bower_components, minify and push in /public
gulp.task('vendor-css', function() {
	bowerFiles()
	.pipe(flatten())
	.pipe(filter('*.css'))
	.pipe(minifycss())
	.pipe(rename({
        suffix: ".min"
    }))
	.pipe(gulp.dest(dest_path + '/css'))
});

// grab vendor font files from bower_components and push in /public 
gulp.task('vendor-fonts', function() {
	bowerFiles()
	.pipe(filter('**/fonts/*.*'))
	.pipe(flatten())
	.pipe(gulp.dest(dest_path + '/fonts'))
});

// watch task
gulp.task('watch', function() {
 
    // watch all / (root) files
    gulp.watch(src_path + '/*.*', function(event) {
      gulp.run('files');
    });

    // watch .less files
    gulp.watch(src_path + '/less/**/*.less', function(event) {
      gulp.run('styles');
    });
 
    // watch .js files
    gulp.watch(src_path + '/scripts/**/*.js', function(event) {
      gulp.run('scripts');
    });
 
    // watch image files
    gulp.watch(src_path + '/images/**/*', function(event) {
      gulp.run('images');
    });
 
});

// clean /public folder subfolders
gulp.task('clean', function() {
  	return gulp.src([dest_path], {read: false})
    .pipe(clean());
});

// define gulp's default task
gulp.task('default', ['clean', 'files', 'styles', 'scripts', 'images', 'vendor-js', 'vendor-css', 'vendor-fonts', 'watch']);