define([
    'angular',
    'controllers/index',
    'toastr'
], function(angular, controller) {

    'use strict';

    angular.module(controller.name).controller('ProfileUserViewCtrl', function($scope, profileUser, User) {

        $scope.user = new User(profileUser);
    });

});
