// we get all the test files automatically
var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if ( /^(.(?!vendor))*spec\.js$/i.test(file) ) {
			tests.push(file);
		}
	}
}

require.config({
	baseUrl: '/base/public/js',
    paths:{
        angular          : '/base/public/vendor/angular/angular',
		'angular-ui-router': '../vendor/angular-ui-router/release/angular-ui-router.min',
        bootstrap        : '/base/public/vendor/bootstrap/dist/js/bootstrap.min',
        domReady         : '/base/public/vendor/requirejs-domready/domReady',
        jquery           : '/base/public/vendor/jquery/jquery',
        lodash           : '/base/public/vendor/lodash/dist/lodash',
        restangular      : '/base/public/vendor/restangular/dist/restangular',
		'toastr'           : '../vendor/toastr/toastr.min',
        angularMocks     : '/base/public/vendor/angular-mocks/angular-mocks',
		moment: '/base/public/vendor/momentjs/moment'
    },
    shim:{
        angular: {exports:'angular'},
		'angular-ui-router': ['angular'],
        'angularMocks': {
            deps: ['angular'],
            exports: 'angular.mock'
        },

        bootstrap : ['jquery'],
        restangular: ['angular'],
		toastr: {
			exports:'toastr',
			deps: ['jquery']
		},
		moment: {exports: 'moment'}
    },
	deps: tests,
	callback: window.__karma__.start
});
