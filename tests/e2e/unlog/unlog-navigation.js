describe('unlog homepage', function() {
    'use strict';

    var fail = function () {
        expect(true).toBe(false);
    };

    it('should rediect to login page if access to root', function() {
        browser.get('/#/login');
        var loginURL = browser.getCurrentUrl();

        browser.get('/');
        expect(browser.getCurrentUrl()).toEqual(loginURL);
    });

    it('should rediect to login page if access to any page and not authenticated', function() {
        browser.get('/#/login');
        var loginURL = browser.getCurrentUrl();

        browser.get('/#/');
        expect(browser.getCurrentUrl()).toEqual(loginURL);
    });

    it('Should have a required attribute on email and password', function () {
        browser.get('/#/login');

        var email = element(by.model('credentials.email'));
        expect(email.getAttribute('required')).toBeDefined();

    });

    it('Should have a type email on email field', function () {
        browser.get('/#/login');

        var email = element(by.model('credentials.email'));
        expect(email.getAttribute('type')).toEqual('email');

    });

    it('should warn on missing/malformed credentials', function () {
        
    });

    it('should accept a valid email address and password', function () {
        browser.get('/#/login');

        var email = element(by.model('credentials.email'));
        email.sendKeys('user@user.fr');

        var password = element(by.model('credentials.password'));
        password.sendKeys('password');

        expect( email.getAttribute('class') ).toMatch('ng-valid');
        expect( password.getAttribute('class') ).toMatch('ng-valid');

    });

    it('should return to the login page after logout', fail);
    it('should return to the home page after login', fail);
});
