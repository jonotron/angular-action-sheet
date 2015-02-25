var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['sass']);

gulp.task('sass', function() {
  return gulp.src(['styles/sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/'));
});
