var gulp = require('gulp');
require('gulp-load')(gulp);

/*
|--------------------------------------------------------------------------
| Fetch all tasks
|--------------------------------------------------------------------------
*/
gulp.loadTasks(__dirname);

gulp.task('default', ['help']);
