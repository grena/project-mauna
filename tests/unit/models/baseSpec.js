define([
    'angular',
    'angularMocks',
    'restangular',
    'lodash',
    'app'
], function () {
    'use strict';
    var TestEntity;

    describe('Models', function () {

        beforeEach(module('app.models'));

        describe('Base', function () {

            var createService;

            beforeEach( inject( function ( $injector ) {

                var $service = $injector.get('$service');

                createService = function () {
                    return $service('Base', {});
                };

            }));
        });
    });
});
