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
  gulp.src('public_src/js/main.js')
    .pipe(browserify().on('error', gutil.log))
    .pipe(gulp.dest('./public/js'))
  ;
});

gulp.task('lint', function() {
  return gulp.src(['public_src/js/**/*.js', '!public_src/js/libs/**'])
    .pipe(jshint({ globalstrict: true }))
    .pipe(jshint.reporter('default'));
});

// CSS
gulp.task('css', function () {
  gulp.src('./public_src/styl/base.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./public/css'));
});

// Run express server
gulp.task('server', function () {
  server.run({
    file: 'app.js'
  });
  var sys = require('sys');
  shell('open http://localhost:3000');
});

gulp.task('watch', function() {
  gulp.watch(['public_src/styl/**/*.styl'], ['css']);
  gulp.watch(['public_src/js/**/*.js'], ['js', 'lint']);
  gulp.watch(['views/**/*.jade'], server.notify);
  gulp.watch(['public/**/*.css'], server.notify);
  gulp.watch(['public/**/*.js'], server.notify);
});


gulp.task('init', ['bower']);
gulp.task('default', ['bower', 'css', 'lint', 'js', 'server', 'watch']);
