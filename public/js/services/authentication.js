/*
|--------------------------------------------------------------------------
| Authentication service
|--------------------------------------------------------------------------
*/
define(['angular', 'services/index', 'toastr'], function (angular, services, toastr) {

    'use strict';

    angular.module(services.name).factory('AuthenticationService', function($rootScope, $http, SessionService) {

        var cacheSession = function() {
            SessionService.set('authenticated', true);
        };

        var uncacheSession = function() {
            SessionService.unset('authenticated');
        };

        return {
            login: function(credentials) {
                var login = $http.post("/auth/login", credentials);

                login.success(function() {
                    cacheSession();
                    $rootScope.isAuthenticated = true;
                });

                login.error(function(response) {
                    toastr.error(response.flash, 'Erreur !');
                });

                return login;
            },
            logout: function() {
                var logout = $http.get("/auth/logout");

                logout.success(function(response) {
                    toastr.success(response.flash);
                    uncacheSession();
                    $rootScope.isAuthenticated = false;
                });

                return logout;
            },
            register: function(user) {
                var register = $http.post("/auth/register", user);

                register.success(function(response) {
                    toastr.success(response.flash);
                    cacheSession();
                    $rootScope.isAuthenticated = true;
                });

                register.error(function(response) {
                    toastr.error(response.flash, 'Erreur !');
                });

                return register;
            },
            isLoggedIn: function() {
                return SessionService.get('authenticated');
            }
        };
    });
});
