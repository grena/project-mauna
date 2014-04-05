var gutil = require('gulp-util'),
    q     = require('q'),
    _     = require('lodash');
/*
|--------------------------------------------------------------------------
| Help tasks for gulp tasks
|--------------------------------------------------------------------------
*/

module.exports = function (gulp) {
    'use strict';

    var l = gulp.task('help', function () {
        var promise = q.defer();
        var tasks = _.chain(gulp.tasks).toArray().sortBy('name').value();
        var maxLength = 0;

        _.each(tasks, function (item) {
            maxLength = (maxLength<item.name.length) ? item.name.length : maxLength;
        });

        _.each(tasks, function (item) {
            if (_.isUndefined(item.describe)) {
                item.describe = '';
            }
            var diff = new Array((maxLength - item.name.length <= 0) ? 0 : maxLength - item.name.length);

            gutil.log('- ', gutil.colors.cyan(item.name), diff.join(' '), gutil.colors.yellow(item.describe));
        });
        return promise.promise;
    });

    l.tasks.help.describe = 'Display help';
};
