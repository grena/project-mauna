/*
|--------------------------------------------------------------------------
| Session service
|--------------------------------------------------------------------------
*/
define(['angular', 'factories/index', 'moment'], function (angular, factories, moment) {

    'use strict';

    angular.module(factories.name).service('Helpers', function() {

        this.getTransformerAttribute = function (type) {

            var options = type.split('|');

            type = options[0].toLowerCase();

            var integer = ['int', 'integer'];

            if ( ~ _.indexOf(integer, type) ) {

                return function (val) {

                    return parseInt(val, 10);

                };
            }

            var boolean = ['bool', 'boolean'];
            var falseString = ['0', 'false', 'FALSE'];
            if ( ~ _.indexOf(boolean, type) ) {

                return function (val) {

                    if ( _.isString(val) && ~ _.indexOf(falseString, val) ) {
                        return false;
                    }

                    return !!val;
                };
            }

            var number = ['number', 'float'];

            if ( ~ _.indexOf(number, type) ) {

                return function (val) {
                    return parseFloat(val, 10);
                };
            }

            if ( type === 'string' ) {
                return function (val) {
                    return ''+val;
                };
            }

            if ( type === 'date' ) {

                return function (val) {

                    var format = options[1] || 'YYYY-MM-DD';
                    if ( ! moment.isMoment(val) ) {
                        val = moment(val);
                    }

                    return val.format( format );
                };
            }

            if ( type === 'datetime' ) {

                return function (val) {

                    var format = options[1] || 'YYYY-MM-DD HH:mm:ss';
                    if ( ! moment.isMoment(val) ) {
                        val = moment(val);
                    }
                    if ( ! val.isValid() ) {
                        return null;
                    }
                    return val.format( format );
                };
            }

            if ( type === 'array' ) {

                return function (val) {
                    return _.toArray( val );
                };
            }

            return function (val) {
                return val;
            };
        };
    });
});
