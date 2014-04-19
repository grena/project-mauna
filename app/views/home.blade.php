<!doctype html>

<html>

    <head>
        <meta charset="utf-8">

        <title>The Mauna Project.</title>
        <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.min.css">
        <link rel="stylesheet" href="/css/yeti-bootstrap/bootstrap.css">
        <link rel="stylesheet" href="/vendor/toastr/toastr.css">
        <link rel="stylesheet" href="/css/mauna.css">
    </head>

    <body>
        <input type="hidden" name="csrf_token" value="{% csrf_token() %}">

        <div class="container">

            <div ng-include="'views/navbar.html'"></div>

            <div ui-view></div>

        </div>
        @include('jsvars')
        <script data-main="js/main" src="vendor/requirejs/require.js"></script>
    </body>
</html>
