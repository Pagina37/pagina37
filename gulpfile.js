var gulp = require('gulp');
var checkwords = require('./tests/checkwords');

var config =  {
	files: '**/gedicht.txt'
}

gulp.task('default',['test']);


gulp.task('test',()=>gulp.watch(
	config.files,
	event=>checkwords(event.path))
);





