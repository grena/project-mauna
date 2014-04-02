<?php

class UserTableSeeder extends Seeder
{
    public function run()
    {
        $user = Sentry::createUser(array(
            'email'     => 'user@example.com',
            'password'  => 'user',
            'activated' => true,
        ));
    }
}