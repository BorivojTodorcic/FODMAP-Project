var gulp = require('gulp');
var gulpless = require('gulp-less');
const livereload = require('gulp-livereload');

gulp.task('styles',function(){
    var temp = './styles';

    return gulp.src('./styles/less/*.less')
        .pipe(gulpless())
        .pipe(gulp.dest(temp));
 });
 function styles() {
  var temp = './styles';

  return gulp.src('./styles/less/*.less')
    .pipe(gulpless())
    .pipe(gulp.dest(temp))
    .pipe(livereload());
}

// gulp.task('watch', function() {
//   livereload.listen();
//   gulp.watch('./styles/less/*.less', ['styles']);
// });

function watch() {
  livereload.listen();
  gulp.watch('./styles/less/*.less', styles);
}


exports.styles = styles;
exports.watch = watch;

// Default task
exports.default = gulp.series(styles, watch);