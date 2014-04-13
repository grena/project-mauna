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

    angular.module(model.name).service('Base', ['Helpers',
        function (Helpers) {

            var Base = function (properties) {

                var that   = this;

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

                    _.forOwn( properties.keys, function ( type, name ) {

                        Object.defineProperty(that.attributes, name, {
                            configurable: true,
                            enumerable: true
                        });

                        Object.defineProperty(that, name, {
                            get: function () {
                                return Helpers.getTransformerAttribute(type)(that.attributes[name]);
                            },
                            set: function (newValue) {

                                Object.defineProperty(that.attributes, name, {
                                    configurable: true,
                                    writable: true
                                });

                                Object.defineProperty(that.attributes, name, {
                                    configurable: true,
                                    value: newValue,
                                    enumerable: true,
                                    writable: false
                                });

                                Object.defineProperty(this, 'dirty', {
                                    value: true,
                                    configurable: true
                                });
                            }
                        });
                    });

                    if ( _.has( properties, 'values' ) ) {
                        this.hydrate( properties.values );
                        this.snapshot();
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
            Base.prototype.snapshot = function () {

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

                Object.defineProperty(this, 'dirty', {
                    value: false,
                    configurable: true
                });
            };


            return Base;
        }
    ]);
});
