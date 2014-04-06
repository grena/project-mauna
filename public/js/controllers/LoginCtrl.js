define([
    'app',
], function(app) {

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

});