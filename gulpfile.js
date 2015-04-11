/*global require, exports, module*/

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    server = require('gulp-express'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    jshint = require('gulp-jshint'),
    shell = require('child_process').exec,
    bower = require('gulp-bower');

gulp.task('bower', function () {
  return bower();
});

// Javascript Browserify
gulp.task('js', function () {
  // Single entry point to browserify
  gulp.src('app/client/js/main.js')
    .pipe(browserify().on('error', gutil.log))
    .pipe(gulp.dest('./app/public/js'))
  ;
});

gulp.task('lint', function() {
  return gulp.src(['app/client/js/**/*.js', '!app/client/js/components/**'])
    .pipe(jshint({ globalstrict: true }))
    .pipe(jshint.reporter('default'));
});

// CSS
gulp.task('css', function () {
  gulp.src('./app/client/styl/base.styl')
    .pipe(stylus({
      use: [nib()],
      'include css': true
    }))
    .pipe(gulp.dest('./app/public/css'));
});

// Run express server
gulp.task('server', function () {
  server.run({
    file: 'app.js'
  });
});

gulp.task('watch', function() {
  gulp.watch(['app/client/styl/**/*.styl'], ['css']);
  gulp.watch(['app/client/js/**/*.js'], ['js', 'lint']);
  gulp.watch(['app/**/*.js',
              '!app/public/**/*.js',
              '!app/client/js/**/*.js'], server.run);
  gulp.watch(['app/public/**/*.js'], server.notify);
  gulp.watch(['app/views/**/*.jade'], server.notify);
  gulp.watch(['app/public/**/*.css'], server.notify);
});


gulp.task('init', ['bower']);
gulp.task('default', ['css', 'lint', 'js', 'server', 'watch']);
