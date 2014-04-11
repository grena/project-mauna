define([
    'angular',
    'controllers/index'
], function(angular, controller) {

    'use strict';

    angular.module(controller.name).controller('RegisterCtrl', function($scope) {

        $scope.user = {
            email : '',
            password : ''
        };

        $scope.register = function() {
        };
    });

});
