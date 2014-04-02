<?php

class AuthController extends BaseController {

    public function login()
    {
        try
        {
            // Set login credentials
            $credentials = [
                'email'    => Input::get('email'),
                'password' => Input::get('password')
            ];

            // Try to authenticate the user
            $user = Sentry::authenticate($credentials, false);

            return Response::json($user, 200);
        }
        catch (Cartalyst\Sentry\Users\LoginRequiredException $e)
        {
            echo 'Login field is required.';
            return Response::json(['flash' => 'Login field is required.'], 500);
        }
        catch (Cartalyst\Sentry\Users\PasswordRequiredException $e)
        {
            echo 'Password field is required.';
            return Response::json(['flash' => 'Password field is required.'], 500);
        }
        catch (Cartalyst\Sentry\Users\WrongPasswordException $e)
        {
            echo 'Wrong password, try again.';
            return Response::json(['flash' => 'Wrong password, try again.'], 500);
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
        {
            echo 'User was not found.';
            return Response::json(['flash' => 'User was not found.'], 500);
        }
        catch (Cartalyst\Sentry\Users\UserNotActivatedException $e)
        {
            echo 'User is not activated.';
            return Response::json(['flash' => 'User is not activated.'], 500);
        }

        // The following is only required if throttle is enabled
        catch (Cartalyst\Sentry\Throttling\UserSuspendedException $e)
        {
            echo 'User is suspended.';
            return Response::json(['flash' => 'User is suspended.'], 500);
        }
        catch (Cartalyst\Sentry\Throttling\UserBannedException $e)
        {
            echo 'User is banned.';
            return Response::json(['flash' => 'User is banned.'], 500);
        }
    }

    public function logout()
    {
        Sentry::logout();
        return Response::json(['flash' => 'Logged Out!'], 200);
    }

}