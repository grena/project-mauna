<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Information and caracteristics about Minerals
    |--------------------------------------------------------------------------
    |
    | Here you may specify information and caracteristics about minerals.
    | Usefull for defining constants and gameplay changes.
    |
    */
    'types' => [
        'common'   => [
            'name' => 'common',
            'ratio' => [
                60 => [25, 150],
                30 => [100, 200],
                10 => [150, 250]
            ],
            'minerals' => [
                'selenium' => [
                    70 => [50, 200],
                    30 => [201, 250]
                ],
                'asteros' => [
                    70 => [40, 100],
                    30 => [101, 150],
                ],
                'barium' => [
                    70 => [20, 70],
                    30 => [71, 100]
                ],
                'crystalite' => [
                    70 => [10, 30],
                    30 => [31, 50]
                ]
            ]
        ],
        'precious' => [
            'name' => 'precious',
            'ratio' => [
                60 => [2, 10],
                30 => [6, 13],
                10 => [13, 20]
            ],
            'minerals' => [
                'quazinc' => [
                    70 => [4, 20],
                    30 => [21, 30]
                ],
                'bytanium' => [
                    70 => [2, 16],
                    30 => [17, 25]
                ],
                'korellium' => [
                    70 => [1, 14],
                    30 => [15, 20]
                ],
                'dragonium' => [
                    70 => [1, 6],
                    30 => [7, 10]
                ]
            ]
        ],
        'rare'     => [
            'name' => 'rare',
            'ratio' => [
                70 => [0, 1],
                25 => [1, 2],
                5  => [2, 4]
            ],
            'minerals' => [
                'traxium' => [
                    80 => [0, 1],
                    20 => [2, 3]
                ],
                'nexos' => [
                    90 => [0, 0],
                    10 => [1, 2]
                ]
            ]
        ]
    ]
];
