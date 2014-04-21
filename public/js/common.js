/*
|--------------------------------------------------------------------------
| RequireJS common configuration
|--------------------------------------------------------------------------
| Any new library must be added here.
|
*/

require.config({
    paths: {
        'angular'           : '../vendor/angular/angular.min',
        'angular-ui-router' : '../vendor/angular-ui-router/release/angular-ui-router.min',
        'jquery'            : '../vendor/jquery/jquery.min',
        'bootflat'          : '../vendor/Bootflat/bootflat/js/icheck.min',
        'bootstrap'         : '../vendor/bootstrap/dist/js/bootstrap.min',
        'restangular'       : '../vendor/restangular/dist/restangular.min',
        'toastr'            : '../vendor/toastr/toastr.min',
        'domReady'          : '../vendor/requirejs-domready/domReady',
        'lodash'            : '../vendor/lodash/dist/lodash.min',
        'moment'            : '../vendor/momentjs/moment',
        'ngAnimate'         : '../vendor/angular-animate/angular-animate.min',
        'ngFx'              : '../vendor/ng-Fx/dist/ng-Fx.min',
        'loadingBar'        : '../vendor/angular-loading-bar/src/loading-bar',
    },
    shim: {
        angular: {exports:'angular'},
        loadingBar: ['angular'],
        'angular-ui-router': ['angular'],
        ngAnimate : ['angular'],
        ngFx: ['angular', 'ngAnimate'],
        bootstrap: ['jquery'],
        restangular: ['angular'],
        toastr: {
            exports:'toastr',
            deps: ['jquery']
        },
        moment: {exports: 'moment'}
    }
});
