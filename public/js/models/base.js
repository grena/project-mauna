/*
|--------------------------------------------------------------------------
| Models de base
|--------------------------------------------------------------------------
*/
define([
    'angular',
    'models/index'
], function(angular, model) {

    'use strict';

    angular.module(model.name).service('Base', ['Helpers', '$q', 'Restangular',
        function (Helpers, $q, Restangular) {

            /*
            |--------------------------------------------------------------------------
            | Methods:
            |      - hydrate: hydrate attributes for an instance
            |      - debug: display attributes list
            |      - sync: make a request call to check if resource has been modified, update local if server changes
            |      - save: save the model to server (can be an insert or an update)
            |      - insert: insert a new entity
            |      - update: update an entity
            |      - remove: remove an entity on server and delete current item
            |      - localSync: hydrate an instance with another
            |--------------------------------------------------------------------------
            */

            var setDirty = function (that, value) {

                Object.defineProperty(that, 'dirty', {
                    writable:true,
                    configurable: true
                });

                Object.defineProperty(that, 'dirty', {
                    value: value,
                    writable:true,
                    configurable: true
                });
            };

            var Base = function (properties) {

                var that   = this;

                this.resourceName = this.resourceName || null;

                Object.defineProperty(this, 'dirty', {
                    value: false,
                    configurable: true
                });

                Object.defineProperty(this, "attributes", {
                    value: {},
                    configurable: true
                });

                Object.defineProperty(this, "snapshot", {
                    value: {},
                    configurable: true
                });

                /*
                |--------------------------------------------------------------------------
                | If keys are defined we create it!
                |--------------------------------------------------------------------------
                */
                if ( _.has( properties, 'keys' ) ) {

                    Object.defineProperty(this, 'keys', {
                        value: _.keys( properties.keys ),
                        enumerable: true
                    });

                    _.forOwn( properties.keys, function ( type, name ) {

                        Object.defineProperty(that.attributes, name, {
                            configurable: true,
                            enumerable: true
                        });

                        Object.defineProperty(that, name, {
                            get: function () {
                                return that.attributes[name];
                            },
                            set: function (newValue) {

                                Object.defineProperty(that.attributes, name, {
                                    configurable: true,
                                    writable: true
                                });

                                Object.defineProperty(that.attributes, name, {
                                    configurable: true,
                                    value: Helpers.getTransformerAttribute(type)(newValue),
                                    enumerable: true,
                                    writable: false
                                });

                                if ( that.attributes[name] !== that.snapshot[name]) {
                                    setDirty(that, true);
                                }
                            }
                        });
                    });

                    if ( _.has( properties, 'values' ) ) {
                        this.hydrate( properties.values );
                        this.createSnapshot();
                    }
                }
            };

            /*
            |--------------------------------------------------------------------------
            | Hydrate function
            | Hydrate attributes with values
            |--------------------------------------------------------------------------
            */
            Base.prototype.hydrate = function (data) {

                var that = this;

                _.forOwn( data, function ( value, key ) {

                    if ( _.has( that.attributes, key ) ) {

                        that[key] = value;
                    }

                });
            };

            /*
            |--------------------------------------------------------------------------
            | Snapshot the current values of the model and reset the dirty status
            |--------------------------------------------------------------------------
            */
            Base.prototype.createSnapshot = function () {

                Object.defineProperty( this, 'snapshot', {
                    configurable: true,
                    writable: true
                });

                Object.defineProperty( this, 'snapshot', {
                    configurable: true,
                    value: angular.copy( this.attributes ),
                    enumerable: true,
                    writable: false
                });

                setDirty(this, false);
            };

            /*
            |--------------------------------------------------------------------------
            | Insert new entry in BDD
            |--------------------------------------------------------------------------
            */
            Base.prototype.insert = function() {
                var promise = $q.defer();

                var THAT = this;

                Restangular.all(this.resourceName).post(_.pick(THAT, function (value, key) {

                    return ~THAT.keys.indexOf(key);

                })).then(function (response) {

                    angular.extend(THAT, response.item);

                    promise.resolve(THAT);

                }, function (response) {

                    promise.reject(response);

                });

                return promise.promise;
            };

            return Base;
        }
    ]);
});
