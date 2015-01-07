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
    .pipe(gulp.dest('./app/server/public/js'))
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
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./app/server/public/css'));
});

// Run express server
gulp.task('server', function () {
  server.run({
    file: 'app.js'
  });
  shell('open http://localhost:3000');
});

gulp.task('watch', function() {
  gulp.watch(['app/client/styl/**/*.styl'], ['css']);
  gulp.watch(['app/client/js/**/*.js'], ['js', 'lint']);
  gulp.watch(['app/server/**/*.js', 
              '!app/server/public/**/*.js',
              '!app/client/js/**/*.js'], server.run);
  gulp.watch(['app/server/public/**/*.js'], server.notify);
  gulp.watch(['app/server/views/**/*.jade'], server.notify);
  gulp.watch(['app/server/public/**/*.css'], server.notify);
});


gulp.task('init', ['bower']);
gulp.task('default', ['css', 'lint', 'js', 'server', 'watch']);
