'use strict';

var app = angular.module('app', [
    'ui.router']);

app.config(function($httpProvider) {

    var logsOutUserOn401 = function($location, $q, SessionService) {
        var success = function(response) {
            return response;
        };

        var error = function(response) {
            if(response.status === 401) {
                SessionService.unset('authenticated');
                $location.path('/login');
                // FlashService.show(response.data.flash);
            }
            return $q.reject(response);
        };

        return function(promise) {
            return promise.then(success, error);
        };
    };

    $httpProvider.responseInterceptors.push(logsOutUserOn401);

});

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('lost_password', {
            url: '/lostpassword',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        });

});

app.run(function($rootScope, $location, AuthenticationService) {

    var publicRoutes = ['/login', '/register', '/'];

    $rootScope.isAuthenticated = AuthenticationService.isLoggedIn();

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if( !_(publicRoutes).contains($location.path()) && !AuthenticationService.isLoggedIn() )
        {
            $location.path('/login');
            event.preventDefault();
            event.stopPropagation();
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

app.factory('AuthenticationService', function($rootScope, $http, $location, SessionService) {

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

            return login;
        },
        logout: function() {
            var logout = $http.get("/auth/logout");

            logout.success(function() {
                uncacheSession();
                $rootScope.isAuthenticated = false;
            });

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

    $scope.load = false;

    $scope.go = function (path) {
        NavigationService.go(path);
    };

    $scope.login = function() {

        $scope.load = true;

        AuthenticationService.login($scope.credentials)
            .success(function() {
                $location.path('/dashboard');
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

app.controller('NavbarCtrl', function($rootScope, $scope, $location, AuthenticationService) {

    $scope.loggedIn = $rootScope.isAuthenticated;

    $rootScope.$watch('isAuthenticated', function(value) {
        $scope.loggedIn = value;
    });

    $scope.logout = function() {
        AuthenticationService.logout()
            .success(function() {
                $location.path('/login');
            });
    };

});