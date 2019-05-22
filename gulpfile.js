var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', gulp.series(function(){
    return gulp.src(['node_modules/bootstrap/scss/*.scss', 'scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('css'));
}));

gulp.task('watch', gulp.series(function(){
    gulp.watch(['node_modules/bootstrap/scss/*.scss', 'scss/*.scss'], gulp.parallel(['sass']));
}));

gulp.task('default', gulp.series(['sass', 'watch']));