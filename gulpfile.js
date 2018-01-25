const gulp = require('gulp');
const minifyJS = require('gulp-minify');
const del = require('del');
const concat = require('gulp-concat');
gulp.task('js', function () {
    gulp.src('./src/**/*.js').pipe(minifyJS({
        ext: {
            min: '.js'
        },
        noSource: true
    })).pipe(concat('avalon-front-end-infrastructure.js')).pipe(gulp.dest('./min/'));
});
gulp.task('clean', function () {
    del('./src/', {
        force: true
    });
});
gulp.task('build', ['js', 'clean']);