var gulp        = require('gulp');
var prefix      = require('gulp-autoprefixer');
var cssnano     = require('gulp-cssnano');
var combineMq   = require('gulp-combine-mq');
var concat      = require('gulp-concat');
var eslint      = require('gulp-eslint');
var minifyCSS   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var scsslint    = require('gulp-scss-lint');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var runSequence = require('run-sequence');

gulp.task('javascript:bootstrap', function () {
  return gulp.src(['./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'])
    .pipe(rename('bootstrap-3.3.7.js'))
    .pipe(gulp.dest('./js/vendor'))
});

gulp.task('javascript:jquery', function () {
  return gulp.src(['./node_modules/jquery/dist/jquery.js'])
    .pipe(rename('jquery-2.2.4.js'))
    .pipe(gulp.dest('./js/vendor'))
});

gulp.task('javascript:jquery-lazyload', function () {
  return gulp.src(['./node_modules/jquery-lazyload/jquery.lazyload.js'])
    .pipe(rename('jquery.lazyload-1.9.7.js'))
    .pipe(gulp.dest('./js/vendor'))
});

gulp.task('javascript', function() {
  return gulp.src(['./js/**/*.js'])
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('./js'))
  .pipe(uglify())
  .pipe(browserSync.reload({stream:true}))
  .pipe(rename('scripts.min.js'))
  .pipe(gulp.dest('./js'));
});

gulp.task('es-lint', function() {
  return gulp.src(['./js/**/*.js', '!./js/vendor/**', '!./js/scripts.js', '!./js/scripts.min.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format());
    // .pipe(eslint.failAfterError());
});

gulp.task('scripts', function(done) {
  return runSequence(
    'javascript:bootstrap',
    'javascript:jquery',
    'javascript:jquery-lazyload',
    'es-lint',
    'javascript',
    done);
});

gulp.task('scss', function () {
  return gulp.src(['./sass/**/*.scss'])
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./'))
    .pipe(combineMq({
        beautify: false
    }))
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('scss-lint', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(scsslint());
});

gulp.task('browser-sync', function() {
  var files = [
  './style.css',
  './*.php'
  ];

  browserSync.init(files, {
    proxy: "localhost/sites/rowan-parkinson/"
  });
});

gulp.task('styles', ['scss-lint', 'scss']);

gulp.task('watch', function () {
  gulp.watch(['./frontend/_global/**/*.scss', './frontend/_sass/**/*.scss'], ['styles']);
  gulp.watch(['./frontend/_js/**/*.js'], ['scripts']);
});

gulp.task('default', function(done) {
  return runSequence(
    'styles',
    'scripts',
    'browser-sync',
    'watch',
    done);
});
