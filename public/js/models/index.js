/*
|--------------------------------------------------------------------------
| Models
| Ceci est notre base module pour la partie models
| Chaque model doit avoir ce fichier en dependencie pour récup le nom
| Ainsi que les dépendences du module
|--------------------------------------------------------------------------
*/
define(['angular'], function (angular) {

    'use strict';

    return angular.module('app.models', ['restangular']);
});
