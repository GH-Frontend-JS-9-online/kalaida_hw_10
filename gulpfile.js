var gulp      = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass        = require('gulp-sass'),
  gulpVersion = 4;

gulp.task('sass', function() {
  return gulp.src('assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function() {
  return gulp.src('assets/img/**/*')
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
  return gulp.src('assets/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}));
});

if(gulpVersion === 3) {
  gulp.task("watch", [ 'sass', "html", 'img', 'js'], function () {
    browserSync.init({
      server: "./build",
      notify: false,
      ui: {
        port: 3000
      }
    });
    gulp.watch('assets/sass/**/*.scss', ["sass"]);
    gulp.watch('assets/img/**/*', ["img"]);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/**/*.html' , ['html']);
  });
  gulp.task('default', ['watch'])
}

if(gulpVersion === 4) {
  gulp.task('watch', function () {
    browserSync.init({
      server: './build',
      notify: false,
      ui: {
        port: 3000
      }
    });
    gulp.watch('assets/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('assets/img/**/*', gulp.parallel('img'));
    gulp.watch('assets/js/**/*.js', gulp.parallel('js'));
    gulp.watch('assets/**/*.html' , gulp.parallel('html'));
  });
  gulp.task('default', gulp.parallel('watch', 'sass', "html", 'img', 'js'));
}
