define([
    'angular',
    'controllers/index'
], function(angular, controller) {

    'use strict';

    angular.module(controller.name).controller('NavbarCtrl', function($rootScope, User, $scope, $state, AuthenticationService) {

        $scope.loggedIn = $rootScope.isAuthenticated;

        $scope.rootUrl = angular.copy(window.rootUrl);

        $scope.goToProfile = function () {
            console.log(User.current);
            if ( User.current ) {
                $state.transitionTo('profile', {
                    user_id: User.current.id
                });
            }
        };

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
