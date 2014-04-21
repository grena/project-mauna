/*
|--------------------------------------------------------------------------
| Models de base
|--------------------------------------------------------------------------
*/
define([
    'angular',
    'models/index',
    'models/base'
], function(angular, model) {

    'use strict';

    angular.module(model.name).service('User', ['Base',
        function (Base) {



            function User ( values ) {

                var data = {
                    keys: {
                        id: 'int',
                        email: 'string'
                    }
                };

                if ( ! _.isUndefined( values ) ) {

                    if ( _.isNumber( values ) ) {

                        data.values = {
                            id: angular.copy( values )
                        };

                    } else if ( _.isObject( values) ) {

                        data.values = angular.copy( values );

                    }
                }

                this.resourceName = 'users';

                Base.call(this, data);
            }

            /**
             * Create a new Entity on the server
             * @param  Object data
             * @return Promise
             */
            var globalMethod = ['create', 'list', 'remove'];
            _.each(globalMethod, function (methodName) {
                User[methodName] = function (data) {
                    return Base[methodName](data, User);
                };
            });

            User.prototype = _.create(Base.prototype, { 'constructor': User });

            User.current = null;

            return User;
        }
    ]);
});
