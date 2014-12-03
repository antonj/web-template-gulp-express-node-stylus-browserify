/*global require, exports, module*/

var gulp = require('gulp'),
    server = require('gulp-express'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    bower = require('gulp-bower');

gulp.task('bower', function () {
  return bower();
});

// Javascript Browserify
gulp.task('js', function () {
    // Single entry point to browserify
    gulp.src('public_src/js/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('./public/js'));
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
});

gulp.task('watch', function() {
  gulp.watch(['public_src/styl/**/*.styl'], ['css']);
  gulp.watch(['public_src/js/**/*.js'], ['js']);
  gulp.watch(['views/**/*.jade'], server.notify);
  gulp.watch(['public/**/*.css'], server.notify);
  gulp.watch(['public/**/*.js'], server.notify);
});


gulp.task('default', ['bower', 'css', 'js', 'server', 'watch']);
