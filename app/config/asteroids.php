<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Information and caracteristics about Asteroids
    |--------------------------------------------------------------------------
    |
    | Here you may specify information and caracteristics about asteroids.
    | Usefull for defining constants and gameplay changes.
    |
    */

    'types' => [
        't1' => [
            'key'                => 't1',
            'name'               => 'BETA',
            'rarity'             => 82,
            'ore_multiplier' => 1,
            'radioactivity'      => [
                70 => [1, 2],
                25 => [2, 4],
                5  => [5, 5]
            ],
        ],
        't2' => [
            'key'                => 't2',
            'name'               => 'Classe TITAN',
            'rarity'             => 16,
            'ore_multiplier' => 2.3,
            'radioactivity'      => [
                70 => [4, 7],
                25 => [7, 9],
                5  => [11, 11]
            ],
        ],
        't3' => [
            'key'                => 't3',
            'name'               => 'Géocroiseur',
            'rarity'             => 1.7,
            'ore_multiplier' => 5.8,
            'radioactivity'      => [
                70 => [7, 9],
                25 => [10, 12],
                5  => [14, 14]
            ],
        ],
        't4' => [
            'key'                => 't4',
            'name'               => 'Archonte T30',
            'rarity'             => 0.3,
            'ore_multiplier' => 12,
            'radioactivity'      => [
                70 => [15, 18],
                25 => [19, 22],
                5  => [25, 25]
            ],
        ],
    ]
];
