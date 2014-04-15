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
     function sanitizeRestangularAll(items) {
        var all = _.map(items, function (item) {
            return sanitizeRestangularOne(item);
        });
        return sanitizeRestangularOne(all);
    }

    // Remove all Restangular/AngularJS added methods in order to use Jasmine toEqual between the retrieve resource and the model

    function sanitizeRestangularOne(item) {
        return _.omit(item, "route", "parentResource", "getList", "get", "post", "put", "remove", "head", "trace", "options", "patch",
            "$get", "$save", "$query", "$remove", "$delete", "$put", "$post", "$head", "$trace", "$options", "$patch",
            "$then", "$resolved", "restangularCollection", "customOperation", "customGET", "customPOST",
            "customPUT", "customDELETE", "customGETLIST", "$getList", "$resolved", "restangularCollection", "one", "all", "doGET", "doPOST",
            "doPUT", "doDELETE", "doGETLIST", "addRestangularMethod", "getRestangularUrl");
    }

    describe('Models', function () {

        beforeEach(module('app.models'), function(RestangularProvider) {
            RestangularProvider.setBaseUrl('http://testing');
        });



        describe('Base', function () {

            var Service, $httpBackend, CustomEntity;

            beforeEach(inject(function ($injector) {

                Service = $injector.get('Base');

                $httpBackend = $injector.get('$httpBackend');

                CustomEntity = function (data) {

                    this.keys = {
                        id: 'int'
                    };

                    Service.call(this, data);

                };

                /**
                 * Create a new Entity on the server
                 * @param  Object data
                 * @return Promise
                 */
                var globalMethod = ['create', 'list', 'remove'];
                _.each(globalMethod, function (methodName) {
                    CustomEntity[methodName] = function (data) {
                        return Service[methodName](data, CustomEntity);
                    };
                });

                CustomEntity.prototype = _.create(Service.prototype, { 'constructor': CustomEntity });

            }));

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });


            it('Should return a function', function () {

                expect( typeof Service ).toEqual( 'function' );

            });

            it('Should produce an item with an id property', function () {

                var custom = new Service({
                    keys: {
                        'id': 'int'
                    }
                });

                expect( _.isUndefined( custom.id ) ).toBe( true );
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

            it('Should have a dirty set to true only if a value is modified with a different value', function () {

                var custom = new Service({
                    keys: {
                        id: 'int',
                        name: 'string'
                    },
                    values: {
                        id: '1',
                        name: 'bisous'
                    }
                });

                expect( custom.dirty ).toBe( false );

                custom.name = 'bisous';

                expect( custom.dirty ).toBe( false );

                custom.name = 'bisoustoussa';

                expect( custom.dirty ).toBe( true );

            });

            it('Should have a keys property', function () {

                var custom = new Service({
                    keys: {
                        id: 'int',
                        name: 'string'
                    }
                });

                expect( custom.keys ).toEqual( ['id', 'name']);

            });

            it('Should have an insert if dirty', function () {

                $httpBackend.whenPOST('/custom').respond({item: {id: 1, name: 'bisous'}});

                var custom = new Service({
                    keys: {
                        id: 'int',
                        name: 'string'
                    },
                    values: {
                        name: 'bisous'
                    }
                });

                custom.resourceName = 'custom';

                custom.insert();

                $httpBackend.flush();

                expect( custom.id ).toEqual( 1 );
            });

            it('Should perform an update if dirty', function () {

                var custom = new Service({
                    keys: {
                        id: 'int',
                        name: 'string'
                    },
                    values: {
                        id: 1,
                        name: 'bisous'
                    }
                });

                custom.resourceName = 'custom';

                custom.update();

                custom.name = 'bisous';

                custom.update();

                expect( custom.id ).toEqual( 1 );

                $httpBackend.expectPUT('/custom/1');

                $httpBackend.whenPUT('/custom/1').respond({item: {id: 1, name: 'simonAfter'}});

                custom.name = 'simon';

                custom.update();

                expect( custom.name ).toEqual( 'simon' );

                $httpBackend.flush();

                expect( custom.name ).toEqual( 'simonAfter' );

            });

            it('Should perform an update if dirty', function () {

                var custom = new Service({
                    keys: {
                        id: 'int',
                        name: 'string'
                    },
                    values: {
                        id: 1,
                        name: 'bisous'
                    }
                });

                custom.resourceName = 'custom';

                $httpBackend.expectGET('/custom/1');

                $httpBackend.whenGET('/custom/1').respond({id: 1, name: 'simon'});

                custom.sync();

                expect( custom.name ).toEqual( 'bisous' );

                $httpBackend.flush();

                expect( custom.name ).toEqual( 'simon' );

            });

            it('Should have a create method', function () {

                expect( _.isUndefined( CustomEntity.create ) ).toBe( false );

            });
        });
    });
});
