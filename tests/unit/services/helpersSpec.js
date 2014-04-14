define([
    'moment',
    'angular',
    'angularMocks',
    'restangular',
    'lodash',
    'app'
], function (moment) {
    'use strict';
    var TestEntity;

    describe('Services', function () {

        beforeEach(module('app.services'));

        describe('Helpers', function () {

            var Helpers, parser;

            beforeEach(inject(function ($injector) {

                Helpers = $injector.get('Helpers');

            }));

            describe('Integers', function () {

                it('Should return the same function for int and integer', function () {

                    var parserInt = ('' + Helpers.getTransformerAttribute('int')).toString();
                    parser = ('' + Helpers.getTransformerAttribute('integer')).toString();

                    expect( parserInt ).toEqual( parser );

                });

                it('Should return a Number when used with "1" with type "int"', function () {

                    parser = Helpers.getTransformerAttribute('int');

                    expect( _.isNumber( parser('1') ) ).toBe(true);

                });

                it('Should return a Number when used with 1 with type "int"', function () {

                    parser = Helpers.getTransformerAttribute('int');

                    expect( _.isNumber( parser(1) ) ).toBe(true);
                });

                it('Should return a NaN when used with "xxx" with type "int"', function () {

                    parser = Helpers.getTransformerAttribute('int');
                    var result = parser("xxx");

                    expect( _.isNumber( result ) ).toBe(true);

                    expect( _.isNaN( result ) ).toBe(true);
                });
            });

            describe('Boolean', function () {

                it('Should return the same function for bool and boolean', function () {

                    var parserBool = ('' + Helpers.getTransformerAttribute('bool')).toString();
                    parser = ('' + Helpers.getTransformerAttribute('boolean')).toString();

                    expect( parserBool ).toEqual( parser );
                });

                it('Should return true with "true"', function () {

                    parser = Helpers.getTransformerAttribute('bool');

                    expect( parser("true") ).toBe(true);
                });

                it('Should return false with "false"', function () {

                    parser = Helpers.getTransformerAttribute('bool');

                    expect( parser("false") ).toBe(false);
                });

                it('Should return true with 1', function () {

                    parser = Helpers.getTransformerAttribute('bool');

                    expect( parser(1) ).toBe(true);
                });

                it('Should return false with 0', function () {

                    parser = Helpers.getTransformerAttribute('bool');

                    expect( parser(0) ).toBe(false);
                });

                it('Should return true with "1"', function () {

                    parser = Helpers.getTransformerAttribute('bool');

                    expect( parser("1") ).toBe(true);
                });

                it('Should return false with "0"', function () {

                    parser = Helpers.getTransformerAttribute('bool');

                    expect( parser("0") ).toBe(false);
                });
            });

            describe('Floats', function () {

                it('Should return the same function for float and number', function () {

                    var parserFloat = ('' + Helpers.getTransformerAttribute('float')).toString();
                    parser = ('' + Helpers.getTransformerAttribute('number')).toString();

                    expect( parserFloat ).toEqual( parser );
                });

                it('Should return a NaN with "xxx"', function () {

                    parser = Helpers.getTransformerAttribute('number');

                    expect( _.isNaN( parser('xxx') ) ).toBe(true);
                });

                it('Should return a float value with "3.3"', function () {

                    parser = Helpers.getTransformerAttribute('number');

                    expect( parser('3.3') ).toEqual( 3.3 );

                });

                it('Should return a float value with ".3"', function () {

                    parser = Helpers.getTransformerAttribute('number');

                    expect( parser('.3') ).toEqual( 0.3 );

                });

                it('Should return a NaN value with "sdsdsd.3"', function () {

                    parser = Helpers.getTransformerAttribute('number');

                    expect( _.isNaN( parser("sdsdsd.3") ) ).toBe( true );

                });
            });

            describe('Strings', function () {

                it('Should return a "1" with 1', function () {

                    parser = Helpers.getTransformerAttribute('string');

                    expect( parser(1) ).toEqual('1');
                });

                it('Should return a empty string value with empty array', function () {

                    parser = Helpers.getTransformerAttribute('string');

                    expect( parser([]) ).toEqual( '' );

                });

                it('Should return a 1,2 value with [1, 2]', function () {

                    parser = Helpers.getTransformerAttribute('string');

                    expect( parser([1, 2]) ).toEqual( '1,2' );

                });

                it('Should return a NaN value with "sdsdsd.3"', function () {

                    parser = Helpers.getTransformerAttribute('string');

                    expect( parser({}) ).toBe( '[object Object]' );

                });
            });

            describe('Date', function () {

                it('Should accept a moment object', function () {

                    parser = Helpers.getTransformerAttribute('date');
                    var m = moment();

                    expect( parser(m) ).toEqual( m.format('YYYY-MM-DD') );
                });

                it('Should accept a string and convert it to date', function () {

                    parser = Helpers.getTransformerAttribute('date');

                    var m = moment();

                    expect( parser( m.format('YYYY-MM-DD') ) ).toEqual( m.format('YYYY-MM-DD') );
                });

                it('Should accept a string and convert it to date with other format', function () {

                    parser = Helpers.getTransformerAttribute('date|DD/MM/YYYY');

                    var m = moment();

                    expect( parser( m.format('YYYY-MM-DD') ) ).toEqual( m.format('DD/MM/YYYY') );
                });
            });

            describe('DateTime', function () {

                it('Should accept a moment object', function () {

                    parser = Helpers.getTransformerAttribute('datetime');
                    var m = moment();

                    expect( parser(m) ).toEqual( m.format('YYYY-MM-DD HH:mm:ss') );
                });

                it('Should accept a string and convert it to date', function () {

                    parser = Helpers.getTransformerAttribute('datetime');

                    var m = moment();

                    expect( parser( m.format('YYYY-MM-DD HH:mm:ss') ) ).toEqual( m.format('YYYY-MM-DD HH:mm:ss') );
                });

                it('Should accept a string and convert it to date with other format', function () {

                    parser = Helpers.getTransformerAttribute('datetime|DD/MM/YYYY HH:mm');

                    var m = moment();

                    expect( parser( m.format('YYYY-MM-DD HH:mm:ss') ) ).toEqual( m.format('DD/MM/YYYY HH:mm') );
                });

                it('Should reject a null value', function () {

                    parser = Helpers.getTransformerAttribute('datetime|DD/MM/YYYY HH:mm');

                    var m = moment();

                    expect( parser( null ) ).toEqual( null );
                });
            });

            describe('Array', function () {

                it('Should return an array with Object', function () {

                    parser = Helpers.getTransformerAttribute('array');

                    expect( parser({1: 'foo', 3: 'woo'}) ).toEqual( ['foo', 'woo'] );

                });

                it('Should return an array with int', function () {

                    parser = Helpers.getTransformerAttribute('array');

                    expect( parser( 1 ) ).toEqual([]);
                });

                it('Should return an array with string', function () {

                    parser = Helpers.getTransformerAttribute('array');

                    expect( parser( 'sss' ) ).toEqual( ['s', 's', 's'] );

                });

                it('Should return an array with an array', function () {

                    parser = Helpers.getTransformerAttribute('array');

                    expect( parser( [1, 2] ) ).toEqual( [1, 2] );
                });
            });
        });
    });
});
