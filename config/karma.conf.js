module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '../',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            {pattern: 'public/js/*.js', included: false},
            {pattern: 'public/js/**/*.js', included: false},
            {pattern: 'tests/unit/**/*.js', included: false},
            {pattern: 'public/vendor/**/*.js', included: false},
            'tests/main-test.js'
        ],

        autoWatch: true,
        LogLevel: config.LOG_DEBUG,
        browsers: ['PhantomJS'],
        reporters: ['story'],
        singleRun: false
    });
};
