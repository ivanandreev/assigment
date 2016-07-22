var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    webserver = require('gulp-webserver'),
    browserify = require('browserify'),
    ngAnnotate = require('browserify-ngannotate'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

gulp.task('build-css', ['clean'], function() {
    return gulp.src('./node_modules/bootstrap/dist/css/*')
        .pipe(gulp.dest('./dist/style'));
});

gulp.task('build-template', ['clean'], function() {
    return gulp.src("./partials/*.html").pipe(gulp.dest('./dist/partials'));
});

gulp.task('build-js', function () {
 var b = browserify({
    entries: './js/app.js',
    debug: true,
    paths: ['./js/controllers', './js/services', './js/directives'],
    transform: [ngAnnotate]
 });

 return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())        
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build', [ 'clean', 'build-css','build-template','build-js'], function() {
    return gulp.src('index.html')        
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
});

gulp.task('webserver', ['watch','build'], function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/dist/index.html"
        }));
});

gulp.task('dev', ['watch', 'webserver']);

gulp.task('default', ['build']);