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

            function Base (properties) {

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
            }

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
            Base.prototype.insert = function () {
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

            /*
            |--------------------------------------------------------------------------
            | Perform an update
            |--------------------------------------------------------------------------
            */
            Base.prototype.update = function ( force ) {
                var promise = $q.defer();

                force = force || false;

                var THAT = this;

                if ( this.dirty || force ) {

                    Restangular.one(this.resourceName, this.id).put(_.pick(THAT, function (value, key) {

                        return ~THAT.keys.indexOf(key);

                    })).then(function (response) {

                        angular.extend(THAT, response.item);

                        promise.resolve(THAT);

                    }, function (response) {

                        promise.reject(response);

                    });

                } else {
                    promise.resolve(this);
                }


                return promise.promise;
            };

            Base.prototype.save = function() {

                if ( this.id !== null && _.isUndefined( this.id ) ) {

                    // Save as update
                    return this.update();

                }else{

                    // Save as insert
                    return this.insert();

                }
            };


            Base.prototype.localSync = function(root, keys) {

                var THAT = this;

                if ( _.isUndefined(keys) || _.isEmpty(keys) ) {

                    _.each( this.keys, function (value) {

                        if ( ~ THAT.keys.indexOf(value) && _.has(root, value) ) {

                            var vvv = _.clone(root[value]);

                            THAT[value] = vvv;

                        }

                    });

                    return;
                }

                _.each(keys, function (value) {

                    if ( ~ THAT.keys.indexOf(value) && _.has(root, value) ) {

                        var vvv = _.clone(root[value]);

                        THAT[value] = vvv;
                    }
                });

            };

            Base.prototype.sync = function() {
                var pro = $q.defer();

                var THAT = this;

                Restangular.one(this.resourceName, this.id).get().then(function (response) {

                    THAT.localSync(response);

                    pro.resolve();

                }, function (response) {

                    pro.reject(response);

                });

                return pro.promise;
            };

            Base.prototype.remove = function() {

                var pro = $q.defer();

                Restangular.one(this.resourceName, this.id).remove().then(function () {

                    pro.resolve();

                }, function (response) {

                    pro.reject(response);

                });

                return pro.promise;
            };


            /*
            |--------------------------------------------------------------------------
            | Static methods
            |--------------------------------------------------------------------------
            */

            /**
             * Create a new Base on the server
             * @param  Object data
             * @return Promise
             */
            Base.create = function(data, Class) {
                var promise = $q.defer();

                var newEntity = new Class();
                newEntity.hydrate(data);

                newEntity.save().then(promise.resolve, promise.reject);

                return promise.promise;
            };
            /**
             * remove an Base on the server
             * @return Promise
             */
            Base.remove = function(id, Class) {
                var promise = $q.defer();

                var newEntity = new Class({id:id});

                newEntity.remove().then(promise.resolve, promise.reject);

                return promise.promise;
            };

            Base.list = function(data, Class) {
                var promise = $q.defer();

                var newEntity = new Class();

                Restangular.all(newEntity.resourceName).getList(data).then(function (response) {

                    promise.resolve(response);

                }, function (response) {
                    promise.reject(response);
                });

                return promise.promise;
            };

            Base.prototype.debug = function() {
                console.log(this.attributes);
                // _.each(this.attributes, function (item, keys) {
                //     console.log(keys, item );
                // });
            };

            return Base;
        }
    ]);
});
