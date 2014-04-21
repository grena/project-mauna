<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
JavaScript::put(['rootUrl' => url('/')]);

Route::get('/', function()
{
    $user = null;

    if ( Sentry::check() )
    {
        $user = Sentry::getUser();
    }

    JavaScript::put([
        'userFromServer' => $user
    ]);

    return View::make('home');
});

Route::group(array('before' => 'csrf'), function ()
{
    Route::post('/auth/login', ['uses' => 'AuthController@login']);
    Route::post('/auth/register', ['uses' => 'AuthController@register']);
    Route::get('/auth/logout', ['uses' => 'AuthController@logout']);
});

Route::group(array('before' => 'auth|csrf'), function ()
{
    Route::resource('users', 'UserController');
    Route::resource('users.settlers','SettlerController');
});
