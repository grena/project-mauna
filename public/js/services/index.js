/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/
define(['angular', 'exports', 'models', 'config'], function (angular, exports, models, config) {

    'use strict';
    return angular.module('app.services', [models.name, config.name]);
});
