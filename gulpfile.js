/*
Gulpfile intended to start a new project from scratch
The author is @pwnjack
This file relies on bower
Remember to define dependencies in bower.json to grab the packages
See the README for detailed informations
*/

// define gulp
var gulp = require('gulp');

// define plug-ins
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var clean = require('gulp-clean');
var w3cjs = require('gulp-w3cjs');
var mainBowerFiles = require('main-bower-files');

// Define paths variables
var src_path = 'src';
var dest_path =  'public';

// Copy files from /src, and push them inside /public if they are .html files, validate them before output.
gulp.task('files', function() {
	var htmlFilter = gulpFilter('*.html'); // define html filter
	return gulp.src(src_path + '/*.*') // grab all files
	.pipe(newer(dest_path)) // if no changes skip
	.pipe(htmlFilter) // filter html files
	.pipe(w3cjs()) // validate html files
	.pipe(htmlFilter.restore()) // restore html filter
	.pipe(newer(dest_path)) // if no changes skip
	.pipe(gulp.dest(dest_path)) // output in destination folder
	.pipe(notify("<%= file.relative %> pushed")) // notify operation
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
gulp.task('scripts', function() {
	return gulp.src([src_path + '/scripts/plugins.js', src_path + '/scripts/**/*.js'])
	.pipe(concat('main.js'))
	.pipe(gulp.dest(dest_path + '/js'))
	.pipe(uglify())
	.pipe(rename({
        suffix: ".min"
    }))
	.pipe(gulp.dest(dest_path + '/js'))
	.pipe(notify("Scripts task complete"))
});

// Images optimization, if cached skip
gulp.task('images', function() {
  	return gulp.src(src_path + '/images/**/*')
  	.pipe(newer('public/img'))
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(dest_path + '/img'))
    .pipe(notify("Images task complete"))
});

// grab libraries files from bower_components, minify and push in /public
gulp.task('libs', function() {

	var jsFilter = gulpFilter('*.js');
    var cssFilter = gulpFilter('*.css');
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

	return gulp.src(mainBowerFiles())

	// grab vendor js files from bower_components, minify and push in /public
	.pipe(jsFilter)
	.pipe(gulp.dest(dest_path + '/js/vendor'))
	.pipe(uglify())
	.pipe(rename({
        suffix: ".min"
    }))
	.pipe(gulp.dest(dest_path + '/js/vendor'))
	.pipe(jsFilter.restore())

	// grab vendor css files from bower_components, minify and push in /public
	.pipe(cssFilter)
	.pipe(gulp.dest(dest_path + '/css'))
	.pipe(minifycss())
	.pipe(rename({
        suffix: ".min"
    }))
	.pipe(gulp.dest(dest_path + '/css'))
	.pipe(cssFilter.restore())

	// grab vendor font files from bower_components and push in /public 
	.pipe(fontFilter)
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

// clean /public folder
gulp.task('clean', function() {
  	return gulp.src([dest_path], {read: false})
    .pipe(clean());
});

// define build task that compiles everything but without starting the watch task
gulp.task('build', ['clean', 'files', 'styles', 'scripts', 'images', 'libs']);

// configure gulp's default task to run everything
gulp.task('default', ['clean', 'files', 'styles', 'scripts', 'images', 'libs', 'watch']);
