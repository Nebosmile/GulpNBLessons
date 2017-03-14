'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var newer = require('gulp-newer'); // gulp-changed
var remember = require('gulp-remember');
var path = require('path');
var cached = require('gulp-cached');
var browserSync = require('browser-sync').create();


gulp.task('sass', function() {
    return gulp.src('frontend/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(debug({
            title: 'src'
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))

});
gulp.task('sass:watch', function() {
    gulp.watch('frontend/sass/**/*.scss', ['sass']);
});

gulp.task('clean', function() {
    return del('public');
});

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**', {
            since: gulp.lastRun('assets')
        })
        .pipe(cached('assets'))
        .pipe(newer('public'))
        .pipe(remember('img'))
        .pipe(debug({
            title: "assets"
        }))
        .pipe(gulp.dest('public'))
})

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sass', 'assets')))

gulp.task('watch', function() {
    gulp.watch("frontend/sass/**/*.scss", gulp.series('sass'));
    gulp.watch("frontend/assets/**", gulp.series('assets')).on('unlink', function(filepath) {
        remember.forget('img', path.resolve(filepath));
        delete cached.caches.assets[path.resolve(filepath)];
    });
});
gulp.task('serve', function() {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
})
gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve')));
