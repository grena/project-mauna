/*
|--------------------------------------------------------------------------
| Controllers
| Liste tous les controllers disponibles et retourne le module principal
|--------------------------------------------------------------------------
*/

define([
    'controllers/index',
    'controllers/dashboardCtrl',
    'controllers/homeCtrl',
    'controllers/registerCtrl',
    'controllers/loginCtrl',
    'controllers/navBarCtrl',
    'controllers/profileUserViewCtrl'
], function (controller) {

    'use strict';

    return controller;
});
