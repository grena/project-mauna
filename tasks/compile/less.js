var less = require('gulp-less');
/*
|--------------------------------------------------------------------------
| Help tasks for gulp tasks
|--------------------------------------------------------------------------
*/

module.exports = function (gulp) {
    'use strict';

    var l = gulp.task('less', function () {
        gulp.src('public/less/app.less')
            .pipe(less())
            .pipe(gulp.dest('public/css'));
    });

    l.tasks.less.describe = 'Compile less';
};
