var gulp = require('gulp'),
    glob = require('glob');

/*
|--------------------------------------------------------------------------
| Fetch all tasks
|--------------------------------------------------------------------------
*/
var files = glob.sync('./tasks/**/*.js');
files.forEach(function (file) {
    'use strict';
    require(file)(gulp);
});


gulp.task('default', ['help']);
