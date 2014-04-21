<!doctype html>

<html>

<head>
    <meta charset="utf-8">

    <title>The Mauna Project.</title>
    <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.min.css">
    <!--         <link rel="stylesheet" href="/css/yeti-bootstrap/bootstrap.css"> -->
    <link rel="stylesheet" href="/vendor/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/vendor/toastr/toastr.css">
    <link rel="stylesheet" href="/vendor/Bootflat/bootflat/css/bootflat.min.css">
    <link rel="stylesheet" href="/css/mauna.css">
    <link rel="stylesheet" href="/css/app.css">
</head>

<body>
    <input type="hidden" name="csrf_token" value="{% csrf_token() %}">

    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3 text-center" style="padding:30px;">
                <h3><a href="{% url('/') %}">The Mauna Project</a></h3>
                <div class="clearfix"></div>
                <small>Un projet qu'il est plutôt bien!</small>
            </div>
        </div>

        <div ng-include="'views/navbar.html'"></div>

        <div ui-view></div>

        <footer class="footer">
            <div class="container">
                <div class="clearfix">
                    <div class="footer-logo"><a href="#">
                        Bootflat</a></div>
                    <dl class="footer-nav">
                        <dt class="nav-title">PORTFOLIO</dt>
                        <dd class="nav-item"><a href="#">Web Design</a></dd>
                        <dd class="nav-item"><a href="#">Branding &amp; Identity</a></dd>
                        <dd class="nav-item"><a href="#">Mobile Design</a></dd>
                        <dd class="nav-item"><a href="#">Print</a></dd>
                        <dd class="nav-item"><a href="#">User Interface</a></dd>
                    </dl>
                    <dl class="footer-nav">
                        <dt class="nav-title">ABOUT</dt>
                        <dd class="nav-item"><a href="#">The Company</a></dd>
                        <dd class="nav-item"><a href="#">History</a></dd>
                        <dd class="nav-item"><a href="#">Vision</a></dd>
                    </dl>
                    <dl class="footer-nav">
                        <dt class="nav-title">GALLERY</dt>
                        <dd class="nav-item"><a href="#">Flickr</a></dd>
                        <dd class="nav-item"><a href="#">Picasa</a></dd>
                        <dd class="nav-item"><a href="#">iStockPhoto</a></dd>
                        <dd class="nav-item"><a href="#">PhotoDune</a></dd>
                    </dl>
                    <dl class="footer-nav">
                        <dt class="nav-title">CONTACT</dt>
                        <dd class="nav-item"><a href="#">Basic Info</a></dd>
                        <dd class="nav-item"><a href="#">Map</a></dd>
                        <dd class="nav-item"><a href="#">Conctact Form</a></dd>
                    </dl>
                </div>
                <div class="footer-copyright text-center">Copyright © 2014 Flathemes.All rights reserved.</div>
            </div>
        </footer>
    </div>
    @include('jsvars')
    <script data-main="js/main" src="vendor/requirejs/require.js"></script>
</body>
</html>
