define([
    'angular',
    'controllers/index',
    'toastr'
], function(angular, controller, toastr) {

    'use strict';

    angular.module(controller.name).controller('RegisterCtrl', function($scope, $state, AuthenticationService) {

        $scope.user = {
            email : '',
            password : ''
        };

        $scope.register = function() {

            $scope.load = true;

            AuthenticationService.register($scope.user)
            .success(function() {
                $state.transitionTo('dashboard');
            })
            .error(function(response) {
                $scope.load = false;
            });
        };
    });

});
