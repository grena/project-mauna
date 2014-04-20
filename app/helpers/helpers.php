<?php

if ( ! function_exists('mt_float_rand') )
{
    function mt_float_rand($min, $max, $round = 0)
    {
        $randomfloat = $min + mt_rand() / mt_getrandmax() * ($max - $min);

        if($round > 0)
        {
            $randomfloat = round($randomfloat, $round);
        }

        return $randomfloat;
    }
}