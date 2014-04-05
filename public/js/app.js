'use strict';

var app = angular.module('app', [
    'ui.router',
    'restangular']);

app.config(function($httpProvider, $stateProvider) {

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

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            public: true,
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
                user: function(Restangular) {
                    return Restangular.one('user', 1).get();
                },
                settlers: function(Restangular) {
                    return Restangular.one('user', 1).getList('settlers');
                }
            }
        });

    $urlRouterProvider.otherwise('login');
});

app.config(function ($httpProvider, CSRF_TOKEN) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = CSRF_TOKEN;
});

app.config(function (RestangularProvider) {
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
});

app.run(function($rootScope, $state, AuthenticationService) {

    // Let's check if the user is auth
    $rootScope.isAuthenticated = AuthenticationService.isLoggedIn();

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        // If it's not a public route and the user is not authenticated, redirects him to login
        if( !toState.public && !$rootScope.isAuthenticated )
        {
            $state.transitionTo('login');
            event.preventDefault();
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

app.factory('AuthenticationService', function($rootScope, $http, SessionService) {

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
        isLoggedIn: function() {
            return SessionService.get('authenticated');
        }
    };
});

app.controller('LoginCtrl', function($scope, $state, AuthenticationService) {

    $scope.credentials = {
        email : '',
        password : ''
    };

    $scope.load = false;

    $scope.login = function() {

        $scope.load = true;

        AuthenticationService.login($scope.credentials)
            .success(function() {
                $state.transitionTo('dashboard');
            })
            .error(function(response) {
                $scope.load = false;
            });
    };
});

app.controller('RegisterCtrl', function($scope) {

    $scope.user = {
        email : '',
        password : ''
    };

    $scope.register = function() {
    };
});

app.controller('HomeCtrl', function() {

});

app.controller('DashboardCtrl', function($scope, user, settlers) {

    $scope.user = user.originalElement;
    $scope.settlers = settlers;

    $scope.actions = {
        create: {
            selected: false
        },
        join: {
            selected: false
        }
    };

    $scope.create = function() {
        $scope.actions.create.selected = true;
        $scope.actions.join.selected = false;
    };

    $scope.join = function() {
        $scope.actions.create.selected = false;
        $scope.actions.join.selected = true;
    };

});

app.controller('NavbarCtrl', function($rootScope, $scope, $state, AuthenticationService) {

    $scope.loggedIn = $rootScope.isAuthenticated;

    $rootScope.$watch('isAuthenticated', function(value) {
        $scope.loggedIn = value;
    });

    $scope.logout = function() {
        AuthenticationService.logout()
            .success(function() {
                $state.transitionTo('login');
            });
    };

});
