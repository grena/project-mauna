define([
    'angular',
    'angularMocks',
    'restangular',
    'lodash',
    'app'
], function () {
    'use strict';
    var TestEntity;

    describe('Controllers', function () {

        beforeEach(module('app.controllers'));

        describe('LoginCtrl', function () {

            var createController, $scope, $rootScope, $state;

            beforeEach( inject( function ( $injector ) {

                $rootScope = $injector.get('$rootScope');

                $scope = $rootScope.$new();

                $state = $injector.get('$state');

                var $controller = $injector.get('$controller');

                createController = function () {
                    return $controller('LoginCtrl', {
                        '$scope': $scope,
                        '$state': $state
                    });
                };

            }));

            it('Should have a method login', function () {

                var controller = createController();

                expect( $scope.login ).toBeDefined();
            });

            it('Should have a method forgotPassword', function () {

                var controller = createController();

                expect( $scope.forgotPassword ).toBeDefined();
            });

            it('Should have a credentials object', function () {

                var controller = createController();

                expect( $scope.credentials ).toBeDefined();
            });

            it('Should have an email property in credentials object', function () {

                var controller = createController();

                expect( $scope.credentials.email ).toBeDefined();
            });

            it('Should have a password property in credentials object', function () {

                var controller = createController();

                expect( $scope.credentials.password ).toBeDefined();
            });
        });
    });
});
