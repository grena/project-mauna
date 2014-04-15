/*
|--------------------------------------------------------------------------
| RequireJS common configuration
|--------------------------------------------------------------------------
| Any new library must be added here.
|
*/

require.config({
    paths: {
        'angular'          : '../vendor/angular/angular.min',
        'angular-ui-router': '../vendor/angular-ui-router/release/angular-ui-router.min',
        'jquery'           : '../vendor/jquery/jquery.min',
        'bootstrap'        : '../vendor/bootstrap/dist/js/bootstrap.min',
        'restangular'      : '../vendor/restangular/dist/restangular.min',
        'toastr'           : '../vendor/toastr/toastr.min',
        'domReady'         : '../vendor/requirejs-domready/domReady',
        'lodash'           : '../vendor/lodash/dist/lodash.min',
        'moment'           : '../vendor/momentjs/moment'
    },
    shim: {
        angular: {exports:'angular'},
        'angular-ui-router': ['angular'],
        bootstrap: ['jquery'],
        restangular: ['angular'],
        toastr: {
            exports:'toastr',
            deps: ['jquery']
        },
        moment: {exports: 'moment'}
    }
});