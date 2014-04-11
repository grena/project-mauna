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

    it('Should have a required attribute on email and password', fail);
    it('Should have a type email on email field', fail);
    it('should warn on missing/malformed credentials', fail);
    it('should accept a valid email address and password', fail);
    it('should return to the login page after logout', fail);
    it('should return to the home page after login', fail);
});
