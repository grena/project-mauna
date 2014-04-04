<!doctype html>

<html ng-app="app">

    <head>
        <meta charset="utf-8">

        <title>The Mauna Project.</title>
        <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.min.css">
        <link rel="stylesheet" href="/css/yeti-bootstrap/bootstrap.css">
        <link rel="stylesheet" href="/vendor/toastr/toastr.css">
        <link rel="stylesheet" href="/css/mauna.css">

        <script src="vendor/angular/angular.min.js"></script>
        <script src="vendor/angular-ui-router/release/angular-ui-router.min.js"></script>
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="vendor/restangular/dist/restangular.min.js"></script>
        <script src="vendor/lodash/dist/lodash.min.js"></script>
        <script src="vendor/toastr/toastr.min.js"></script>
        <script src="js/app.js"></script>

        <script>
            angular.module("app").constant("CSRF_TOKEN", '{% csrf_token() %}');
        </script>
    </head>

    <body>

        <div class="container">

            <div ng-include="'views/navbar.html'"></div>

            <div ui-view></div>

        </div>
    </body>
</html>