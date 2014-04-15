<?php

return [

    'log' => true,

    'default' => 'sqlite',

    'connections' => [

        'sqlite' => [
            'driver'   => 'sqlite',
            'database' => ':memory:',
            'prefix'   => ''
        ],

        'mysql' => [
            'driver'    => 'mysql',
            'host'      => 'localhost',
            'database'  => 'test-mauna',
            'username'  => 'test-mauna',
            'password'  => 'test-mauna',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ],
    ]
];