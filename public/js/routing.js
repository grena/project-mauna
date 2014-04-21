/*
|--------------------------------------------------------------------------
| This module will define all routing stuff
|--------------------------------------------------------------------------
*/
define(['angular', 'services'], function (angular, services) {

    'use strict';

    var app = angular.module('app.routing', [services.name]);

    /*
    |--------------------------------------------------------------------------
    | This is our routing mapping
    |--------------------------------------------------------------------------
    */
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                public: false,
                templateUrl: 'views/home.html'
            })
            .state('register', {
                url: '/register',
                public: true,
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .state('login', {
                url: '/login',
                public: true,
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('lost_password', {
                url: '/lostpassword',
                public: true,
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                resolve: {
                    user: function(Restangular, userFromServer) {
                        return Restangular.one('users', userFromServer.id).get();
                    },
                    settlers: function(Restangular, userFromServer) {
                        return Restangular.one('users', userFromServer.id).getList('settlers');
                    }
                }
            });

        $urlRouterProvider.otherwise('dashboard');
    }]);

    /*
    |--------------------------------------------------------------------------
    | Add interceptor if we get a 401 from server
    |--------------------------------------------------------------------------
    */
    app.config(function($httpProvider) {

        var logsOutUserOn401 = ['$q', '$injector', 'SessionService', function($q, $injector, SessionService) {
            var success = function(response) {
                return response;
            };

            var error = function(response) {
                if(response.status === 401) {
                    SessionService.unset('authenticated');
                    // Inject service $state after init of $http
                    $injector.get('$state').transitionTo('login');
                }
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];

        $httpProvider.responseInterceptors.push(logsOutUserOn401);

    });

    return app;
});
