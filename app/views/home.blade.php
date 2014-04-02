<!doctype html>

<html ng-app="app">

    <head>
        <meta charset="utf-8">
        <title>The Mauna Project.</title>

        <link rel="stylesheet" href="/vendor/yeti-bootstrap/bootstrap.css">
        <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.min.css">
        <link rel="stylesheet" href="/css/mauna.css">
    </head>

    <body>

        <div class="container">

            <!-- NAVIGATION BAR -->
            <div class="navbar navbar-default">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">The Mauna Project.</a>
                </div>
                <div class="navbar-collapse collapse navbar-responsive-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Colonie</a></li>
                        <li><a href="#">Personnage</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="" class="dropdown-toggle" data-toggle="dropdown">Mon compte <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Paramètres</a></li>
                                <li class="divider"></li>
                                <li><a href="#">Déconnexion</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- END NAVIGATION BAR -->

            <div ui-view></div>

        </div>

        <!-- SCRIPTS -->
        <script src="vendor/angular/angular.min.js"></script>
        <script src="vendor/angular-ui-router/release/angular-ui-router.min.js"></script>
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="vendor/restangular/dist/restangular.min.js"></script>
        <script src="vendor/lodash/dist/lodash.min.js"></script>
        <script src="js/app.js"></script>

        <script>
            angular.module("app").constant("CSRF_TOKEN", '{% csrf_token() %}');
        </script>
    </body>
</html>