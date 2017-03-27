/**
 * Created by andreluis on 27/03/17.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('default', function() {});

gulp.task('serve', function() {
    browserSync.init({
        host: '0.0.0.0',
        server: {
            baseDir: '.',
            index: 'index.html'
        },
        index: 'index.html'
    });

    gulp.watch("templates/*.html").on('change', browserSync.reload);
});