const gulp = require('gulp');
const scss = require('gulp-sass');
// const browserSync = require('browser-sync').create();

//	Compile sass
gulp.task('scss', () => {
	return gulp.src('./scss/*.scss')
	.pipe(scss())
	.pipe(gulp.dest('./public/css'))
})

// gulp.task('browserSync', () => {
// 	return browserSync.init(['./public'], {
// 		server: {
// 			baseDir: './public'
// 		}
// 	})
// })

//	watch files for changes
gulp.task('watch', () => {
	gulp.watch('./scss/**/*.scss', ['scss'])
})

//	default task
gulp.task('default', ['watch'])