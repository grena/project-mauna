define([
    'angular',
    'controllers/index'
], function(angular, controller) {

    'use strict';

    angular.module(controller.name).controller('DashboardCtrl', function($scope, user, settlers) {

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

});
