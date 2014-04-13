define([
    'moment',
    'angular',
    'angularMocks',
    'restangular',
    'lodash',
    'app'
], function (moment) {

    'use strict';

    var TestEntity;

    describe('Models', function () {

        beforeEach(module('app.models'));

        describe('Base', function () {

            var Service;

            beforeEach(inject(function ($injector) {

                Service = $injector.get('Base');

            }));


            it('Should return a function', function () {

                expect( typeof Service ).toEqual( 'function' );

            });

            it('Should produce an item with an id property', function () {

                var custom = new Service({
                    keys: {
                        'id': 'int'
                    }
                });

                expect( _.isNaN( custom.id ) ).toBe( true );
            });

            it('Should produce an item with an active boolean status', function () {

                var custom = new Service({
                    keys: {
                        'id': 'int',
                        'active': 'bool'
                    }
                });

                custom.active = 1;

                expect( custom.active ).toBe( true );

                custom.active = "1";

                expect( custom.active ).toBe( true );

                custom.active = "true";

                expect( custom.active ).toBe( true );

                custom.active = "TRUE";

                expect( custom.active ).toBe( true );

                custom.active = 0;

                expect( custom.active ).toBe( false );

                custom.active = "false";

                expect( custom.active ).toBe( false );
            });

            it('Should hydrate a model with data', function () {

                var custom = new Service({
                    keys: {
                        'id': 'int',
                        'active': 'bool'
                    }
                });

                custom.hydrate({
                    id: "1",
                    active: "true"
                });

                expect( custom.active ).toBe( true );

                expect( custom.id ).toEqual( 1 );

            });

            it('Should hydrate a model with data with complexe field', function () {

                var custom = new Service({
                    keys: {
                        'id': 'int',
                        'active': 'bool',
                        date: 'date|DD/MM/YYYY'
                    }
                });

                var saveTime = moment();

                custom.hydrate({
                    id: "1",
                    active: "true",
                    date: saveTime
                });

                expect( custom.active ).toBe( true );

                expect( custom.id ).toEqual( 1 );

                expect( custom.date ).toEqual( saveTime.format( 'DD/MM/YYYY' ) );

            });

            it('Should have a dirty property and this property cannot be changed', function () {

                var custom = new Service({
                    keys: {
                        id: 'int'
                    }
                });

                expect( custom.dirty ).toBe( false );

                custom.id = 1;

                expect( custom.dirty ).toBe( true );

            });
        });
    });
});
