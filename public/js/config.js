/*
|--------------------------------------------------------------------------
| This module will define all configuration
|--------------------------------------------------------------------------
*/
define(['angular'], function (angular) {

    'use strict';

    var app = angular.module('app.config', []);

    app.config(function ($httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = document.querySelector('[name=csrf_token]').value;

    });

    app.config(['RestangularProvider', '$provide', function (RestangularProvider, $provide) {

        /*
        |--------------------------------------------------------------------------
        | Check if a userFromServer var is present
        |--------------------------------------------------------------------------
        */
        var profile = angular.copy( window.userFromServer );

        $provide.constant('userFromServer', profile);

        RestangularProvider.setResponseExtractor(function(response) {

            var newResponse = response;

            if (angular.isArray(response)) {

                angular.forEach(newResponse, function(value, key) {
                    // newResponse[key].originalElement = angular.copy(value);
                    newResponse.originalElement[key] = angular.copy(value);
                });

            } else {

                newResponse.originalElement = angular.copy(response);

            }

            return newResponse;
        });

    }]);

    return app;
});
