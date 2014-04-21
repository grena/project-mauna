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
            $user = Sentry::authenticate($credentials, Input::get('remember'));

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

            $messages = [
                'password.confirmed'    => 'La confirmation du mot de passe n\'est pas correcte.',
                'password.min'    => 'Le mot de passe doit être d\'une longueur de :min.',
                'between' => 'The :attribute must be between :min - :max.',
                'in'      => 'The :attribute must be one of the following types: :values',
            ];

            $validation = [
                'email'    => 'required|email',
                'password' => 'required|confirmed|min:6'
            ];

            $validator = Validator::make($input, $validation, $messages);

            if($validator->fails()) {
                return Response::json(['flash' => $validator->messages()->first()], 500);
            }

            // Create the user
            $user = Sentry::createUser(array(
                'email'     => Input::get('email'),
                'password'  => Input::get('password'),
                'activated' => true,
            ));

            $credentials = ['email' => $user->email, 'password' => $input['password']];

            $user = Sentry::authenticate($credentials, ( isset($input['remember']) and $input['remember']) );

            return Response::json([
                'flash' => 'Votre recensement a bien été pris en compte par TetraCorp&trade;',
                'userItem' => $user->toArray()
            ], 200);

        }
        catch (Cartalyst\Sentry\Users\LoginRequiredException $e)
        {
            return Response::json(['flash' => 'Un email est obligatoire.'], 500);
        }
        catch (Cartalyst\Sentry\Users\PasswordRequiredException $e)
        {
            return Response::json(['flash' => 'Un mot de passe est obligatoire.'], 500);
        }
        catch (Cartalyst\Sentry\Users\UserExistsException $e)
        {
            return Response::json(['flash' => 'Cet email est déjà utilisé.'], 500);
        }
        catch (Cartalyst\Sentry\Groups\GroupNotFoundException $e)
        {
            return Response::json(['flash' => 'Le groupe n\'a pas été trouvé.'], 500);
        }
    }

}
