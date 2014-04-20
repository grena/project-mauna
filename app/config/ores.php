<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Information and caracteristics about Ores
    |--------------------------------------------------------------------------
    |
    | Here you may specify information and caracteristics about ores.
    | Usefull for defining constants and gameplay changes.
    |
    */
    'types' => [
        'selenium'   => 1,
        'asteros'    => 2,
        'barium'     => 3,
        'crystalite' => 4,
        'quazinc'    => 5,
        'bytanium'   => 6,
        'korellium'  => 7,
        'dragonium'  => 8,
        'traxium'    => 9,
        'nexos'      => 10,
    ],
    'categories' => [
        'common'   => [
            'name' => 'common',
            'ratio' => [
                60 => [25, 150],
                30 => [100, 200],
                10 => [150, 250]
            ],
            'ores' => [
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
            'ores' => [
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
            'ores' => [
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
