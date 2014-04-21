define([
    'angular',
    'controllers/index'
], function(angular, controller) {

    'use strict';

    angular.module(controller.name).controller('NavbarCtrl', function($rootScope, $scope, $state, AuthenticationService) {

        $scope.loggedIn = $rootScope.isAuthenticated;

        $scope.rootUrl = angular.copy(window.rootUrl);

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

});
