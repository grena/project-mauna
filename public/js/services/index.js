/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/
define(['angular', 'exports', 'models'], function (angular, exports, models) {

    'use strict';
    return angular.module('app.services', [models.name]);
});
