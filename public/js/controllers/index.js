/*
|--------------------------------------------------------------------------
| Controllers
| Ceci est notre base module pour la partie controllers
| Chaque controller doit avoir ce fichier en dependencie pour récup le nom
| Ainsi que les dépendences du module
|--------------------------------------------------------------------------
*/
define(['angular', 'services'], function (angular, services) {

    'use strict';

    return angular.module('app.controllers', [services.name, 'ui.router']);
});
