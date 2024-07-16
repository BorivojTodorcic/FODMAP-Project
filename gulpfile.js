var gulp = require('gulp');
var gulpless = require('gulp-less');
const livereload = require('gulp-livereload');

gulp.task('styles',function(){
    var temp = './styles';

    return gulp.src('./styles/less/*.less')
        .pipe(gulpless())
        .pipe(gulp.dest(temp));
 });

gulp.task('watch', function() {
  livereload.listen();
  return gulp.watch('./styles/less/*.less', ['styles']);
});