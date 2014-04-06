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
            return Response::json(['flash' => 'Login field is required.'], 500);
        }
        catch (Cartalyst\Sentry\Users\PasswordRequiredException $e)
        {
            return Response::json(['flash' => 'Password field is required.'], 500);
        }
        catch (Cartalyst\Sentry\Users\WrongPasswordException $e)
        {
            return Response::json(['flash' => 'Wrong password, try again.'], 500);
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
        {
            return Response::json(['flash' => 'User was not found.'], 500);
        }
        catch (Cartalyst\Sentry\Users\UserNotActivatedException $e)
        {
            return Response::json(['flash' => 'User is not activated.'], 500);
        }

        // The following is only required if throttle is enabled
        catch (Cartalyst\Sentry\Throttling\UserSuspendedException $e)
        {
            return Response::json(['flash' => 'User is suspended.'], 500);
        }
        catch (Cartalyst\Sentry\Throttling\UserBannedException $e)
        {
            return Response::json(['flash' => 'User is banned.'], 500);
        }
    }

    public function logout()
    {
        Sentry::logout();
        return Response::json(['flash' => 'Logged Out!'], 200);
    }

    public function register()
    {
        try
        {
            $input = Input::all();

            $validation = [
                'email' => 'required|email',
                'password' => 'required'
            ];

            $validator = Validator::make($input, $validation);

            if($validator->fails()) {
                return Response::json(['flash' => $validator->messages()->first()], 500);
            }

            // Create the user
            $user = Sentry::createUser(array(
                'email'     => Input::get('email'),
                'password'  => Input::get('password'),
                'activated' => true,
            ));

            // Find the group using the group id
            // $adminGroup = Sentry::findGroupById(1);

            // Assign the group to the user
            // $user->addGroup($adminGroup);
        }
        catch (Cartalyst\Sentry\Users\LoginRequiredException $e)
        {
            return Response::json(['flash' => 'Login field is required.'], 500);
        }
        catch (Cartalyst\Sentry\Users\PasswordRequiredException $e)
        {
            return Response::json(['flash' => 'Password field is required.'], 500);
        }
        catch (Cartalyst\Sentry\Users\UserExistsException $e)
        {
            return Response::json(['flash' => 'User with this login already exists.'], 500);
        }
        catch (Cartalyst\Sentry\Groups\GroupNotFoundException $e)
        {
            return Response::json(['flash' => 'Group was not found.'], 500);
        }
    }

}