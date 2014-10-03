'use strict';

/*
Gulpfile intended to start a new project from scratch
The author is @pwnjack
This file relies on bower
Remember to define dependencies in bower.json to grab the packages
See the README for detailed informations
*/

// define gulp
var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

// compile less (for additional stylesheets use @import in style.less)
gulp.task('styles', function () {
    return gulp.src('app/styles/style.less')
    	.pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.autoprefixer('last 15 version', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

// compile scripts and push in a single minimized file inside /dist/js
gulp.task('scripts', function() {
	return gulp.src('app/scripts/**/*.js')
	.pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
    .pipe($.size());
});

// build for production
gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets = $.useref.assets({searchPath: '{.tmp,app}'});

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// html w3c validation
gulp.task('validate', function () {
    gulp.src('app/*.html')
        .pipe($.w3cjs());
});

// images optimization, if cached skip
gulp.task('images', function() {
  	return gulp.src('app/images/**/*')
  	.pipe($.newer('dist/img'))
    .pipe($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe($.notify("Images task complete"))
});

// grab libraries files from bower_components, minify and push in /dist
gulp.task('fonts', function() {
    var fontFilter = $.filter(['*.eot', '*.woff', '*.svg', '*.ttf']);;
    var mainBowerFiles = require('main-bower-files');

	return gulp.src(mainBowerFiles({
	    paths: {
	        bowerDirectory: 'app/bower_components'
	    }
	}))
	.pipe(fontFilter)
	.pipe($.flatten())
	.pipe(gulp.dest('dist/fonts'))
	.pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

// clean /dist folder
gulp.task('clean', function() {
    var del = require('del');
    del(['.tmp', 'dist']);
});

// define build task that compiles everything but without starting the watch task
gulp.task('build', ['html', 'images', 'fonts', 'extras']);

// configure gulp's default task to run everything
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// wire up bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.less')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['app/bower_components/modernizr/modernizr.js' ]
        }))
        .pipe(gulp.dest('app'));
});

// watch task
gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.less', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});