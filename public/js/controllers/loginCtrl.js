/*
|--------------------------------------------------------------------------
| Controller de Login
| Récupère angular + le module controller on crée donc une controller
| Sur notre module déjà crée dans controllers/index
|--------------------------------------------------------------------------
*/
define([
    'angular',
    'controllers/index'
], function(angular, controller) {

    'use strict';

    angular.module(controller.name).controller('LoginCtrl', [
        '$scope', '$state', 'AuthenticationService', 'User', 'userFromServer',
        function ($scope, $state, AuthenticationService, User, userFromServer) {

            $scope.credentials = {
                email    : '',
                password : '',
                password_confirmation: ''
            };

            $scope.load = false;

            /*
            |--------------------------------------------------------------------------
            | Forgot password
            |--------------------------------------------------------------------------
            */
            $scope.forgotPassword = function () {

            };

            /*
            |--------------------------------------------------------------------------
            | Send credentials to API
            |--------------------------------------------------------------------------
            */
            $scope.login = function() {

                $scope.load = true;

                AuthenticationService.login($scope.credentials)
                    .then(function() {
                        User.current = new User( userFromServer );
                        $state.transitionTo('dashboard');
                    }, function(response) {
                        $scope.load = false;
                    });
            };
        }
    ]);
});
