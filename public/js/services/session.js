/*
|--------------------------------------------------------------------------
| Session service
|--------------------------------------------------------------------------
*/
define(['angular', 'services/index'], function (angular, services) {

    'use strict';
    
    angular.module(services.name).factory('SessionService', function() {
        return {
            get: function(key) {
                return sessionStorage.getItem(key);
            },
            set: function(key, val) {
                return sessionStorage.setItem(key, val);
            },
            unset: function(key) {
                return sessionStorage.removeItem(key);
            }
        };
    });
});
