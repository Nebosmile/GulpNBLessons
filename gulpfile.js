'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat =require('gulp-concat');
var debug =require('gulp-debug');
var sourcemaps =require('gulp-sourcemaps');
var del =require('del');


gulp.task('sass', function () {
  return gulp.src('frontend/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(debug({title:'src'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))

});
gulp.task('sass:watch', function () {
  gulp.watch('frontend/sass/**/*.scss', ['sass']);
});

gulp.task('clean', function () {
  return del('public');
});

gulp.task('assets', function () {
  return gulp.src('frontend/assets/**')
  .pipe(debug({title: "assets"}))
  .pipe(gulp.dest('public'))
})

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('sass', 'assets'))
)
gulp.watch("frontend/sass/**/*.scss", gulp.series('sass'));
// gulp.watch("frontend/assets/**", gulp.series('assets'));
