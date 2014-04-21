/*
|--------------------------------------------------------------------------
| Authentication service
|--------------------------------------------------------------------------
*/
define(['angular', 'services/index', 'toastr'], function (angular, services, toastr) {

    'use strict';

    angular.module(services.name).factory('AuthenticationService', function($rootScope, $q, $http, SessionService, User) {

        var cacheSession = function() {
            SessionService.set('authenticated', true);
        };

        var uncacheSession = function() {
            SessionService.unset('authenticated');
        };

        return {
            login: function(credentials) {
                var promise = $q.defer();

                var login = $http.post("/auth/login", credentials);

                login.success(function(response) {
                    cacheSession();

                    User.current = new User(response);

                    $rootScope.isAuthenticated = true;

                    promise.resolve();
                });

                login.error(function(response) {
                    toastr.error(response.flash, 'Erreur !');
                    promise.reject();
                });

                return promise.promise;
            },
            logout: function() {
                var logout = $http.get("/auth/logout");

                logout.success(function(response) {
                    toastr.success(response.flash);

                    uncacheSession();

                    $rootScope.isAuthenticated = false;

                    userFromServer = null;

                    User.current = null;
                });

                return logout;
            },
            register: function(user) {
                var pro = $q.defer();

                var register = $http.post("/auth/register", user);

                register.success(function(response) {
                    toastr.success(response.flash);

                    cacheSession();

                    $rootScope.isAuthenticated = true;

                    userFromServer = angular.copy(response.userItem);

                    User.current = new User(userFromServer);

                    pro.resolve();

                });

                register.error(function(response) {
                    toastr.error(response.flash, 'Erreur !');

                    pro.reject();
                });

                return pro.promise;
            },
            isLoggedIn: function() {
                return SessionService.get('authenticated');
            }
        };
    });
});
