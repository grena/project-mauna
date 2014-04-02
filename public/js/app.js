'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        });
});

app.run(function($rootScope, $location, AuthenticationService) {

    var publicRoutes = ['/login', '/register'];

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if( !_(publicRoutes).contains($location.path()) && !AuthenticationService.isLoggedIn() )
        {
            $location.path('/login');
        }
    });

});

app.factory('SessionService', function() {
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

app.factory('AuthenticationService', function($http, $location, SessionService) {

    var cacheSession = function() {
        SessionService.set('authenticated', true);
    };

    var uncacheSession = function() {
        SessionService.unset('authenticated');
    };

    return {
        login: function(credentials) {
            var login = $http.post("/auth/login", credentials);
            login.success(cacheSession);

            return login;
        },
        logout: function() {
            var logout = $http.get("/auth/logout");
            logout.success(uncacheSession);

            return logout;
        },
        isLoggedIn: function() {
            return SessionService.get('authenticated');
        }
    };
});

app.factory('NavigationService', function($location) {
    return {
        go: function(path) {
            $location.path(path);
        }
    };
});

app.controller('LoginCtrl', function($scope, $location, NavigationService, AuthenticationService) {

    $scope.credentials = {
        email : '',
        password : ''
    };

    $scope.go = function (path) {
        NavigationService.go(path);
    };

    $scope.login = function() {
        AuthenticationService.login($scope.credentials)
            .success(function() {

            });
    };
});

app.controller('RegisterCtrl', function($scope, $location, NavigationService) {

    $scope.user = {
        email : '',
        password : ''
    };

    $scope.go = function (path) {
        NavigationService.go(path);
    };

    $scope.register = function() {
    };
});

app.controller('HomeCtrl', function() {

});

app.controller('DashboardCtrl', function() {

});