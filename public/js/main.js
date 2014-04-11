/*
|--------------------------------------------------------------------------
| RequireJS app configuration
|--------------------------------------------------------------------------
| App configuration goes here.
|
*/

require(['require', 'common'], function (require) {
    'use strict';

    // A cet instant le fichier common.js est chargé
    // On require ensuite notre app

    require(['angular', 'app'], function (angular) {
        // on a load la lib angularJS + notre fichier app.js
        require(['domReady!'], function (document) {
            angular.bootstrap(document, ['app']);
        });
    });
});
