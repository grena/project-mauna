
define([
    'angular',
    'config',
    'routing',
    'services',
    'factories',
    'controllers',
    'models',
    'ngAnimate',
    'ngFx',
    'loadingBar',
    'angular-ui-router',
    'jquery',
    'bootstrap',
    'restangular',
    'toastr',
    'lodash'
], function(angular, config, routing, services, controllers, models) {

    'use strict';

    /*
    |--------------------------------------------------------------------------
    | At this point we have modules and lib loaded
    | We can create our root App with dependencies
    |--------------------------------------------------------------------------
    */
    var app = angular.module('app', [
        'ngAnimate',
        'fx.animations',
        'ui.router',
        'chieffancypants.loadingBar',
        'restangular',
        config.name,
        routing.name,
        services.name,
        controllers.name,
        models.name
    ]);

    app.run(function($rootScope, $state, AuthenticationService, userFromServer, SessionService, User) {

        if ( ! _.isNull( userFromServer ) ) {

            if ( _.has(userFromServer, 'id') && _.has(userFromServer, 'activated') ) {

                SessionService.set('authenticated', ( userFromServer.id && userFromServer.activated ) );

                User.current = new User( userFromServer );
            }

        }
        // Let's check if the user is auth
        $rootScope.isAuthenticated = AuthenticationService.isLoggedIn();

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            // If it's not a public route and the user is not authenticated, redirects him to login
            if( !toState.public && !$rootScope.isAuthenticated )
            {
                $state.transitionTo('login');
                event.preventDefault();
            }
        });

    });

    return app;

});
