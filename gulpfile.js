const gulp = require('gulp');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

gulp.task('styles', function () {
    return gulp.src('src/styles/main.scss', {base: 'src'})
        .pipe(sourcemaps.init())
        .pipe(debug({title: 'read'}))
        .pipe(sass())
        .pipe(debug({title: 'sass'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'))
});

gulp.task('watch', () => {
    gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
});

gulp.task('assets', () => {
    return gulp.src('src/assets/**/*.*', {base: 'src/assets', since: gulp.lastRun('assets')})
        .pipe(newer('public'))
        .pipe(debug({title: 'copy'}))
        .pipe(gulp.dest('public'))
});

gulp.task('build', gulp.parallel('styles', 'assets'));

gulp.task('serve', () => {
    browserSync.init({
        server: 'public'
    });

    browserSync.watch('public/**/*.*').on('change', browserSync.reload)
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

