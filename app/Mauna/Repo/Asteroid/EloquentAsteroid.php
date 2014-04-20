<?php namespace Mauna\Repo\Asteroid;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;
use \Asteroid;

use \Config;
use \Exception;

class EloquentAsteroid extends RepoAbstract implements RepoInterface, AsteroidInterface {

    public function __construct( Asteroid $asteroid )
    {
        $this->model = $asteroid;
    }

    /**
     * Generate a type for the asteroid (the size)
     *
     * @param  Asteroid $asteroid Asteroid to modify
     * @return Asteroid with the type
     */
    public function generateType( Asteroid $asteroid )
    {
        $types = Config::get('asteroids.types');
        $total_rarity = array_sum(array_pluck($types, 'rarity'));

        $current = 0;
        $rand = mt_float_rand(0, $total_rarity, 1);

        foreach( $types as $type )
        {
            $current += $type['rarity'];

            if( $rand <= $current )
            {
                $asteroid->type = $type['key'];
                break;
            }
        }

        return $asteroid;
    }

    /**
     * Generates the radioctivity amount for the asteroid
     *
     * @param  Asteroid $asteroid Asteroid to modify
     * @return Asteroid with the radioactivity
     */
    public function generateRadioactivity( Asteroid $asteroid )
    {
        if ( ! $asteroid->type )
        {
            throw new Exception( __METHOD__ . ' : Cannot generate radioactivity on an Asteroid without type' );
        }

        $config = array_first(Config::get('asteroids.types'), function($k, $config) use ($asteroid) {
            return $config['key'] == $asteroid->type;
        });;

        $current = 0;
        $rand = mt_rand(0, 100);

        foreach($config['radioactivity'] as $percent => $values)
        {
            list($min, $max) = $values;

            $current += $percent;

            if($rand <= $current)
            {
                $asteroid->radioactivity = mt_rand($min, $max);
                break;
            }
        }

        return $asteroid;
    }

    /**
     * Generates minerals for the asteroid
     *
     * @param  Asteroid $asteroid Asteroid to modify
     * @return Asteroid with minerals
     */
    public function generateMinerals( Asteroid $asteroid )
    {
        if ( ! $asteroid->type )
        {
            throw new Exception( __METHOD__ . ' : Cannot generate minerals on an Asteroid without type' );
        }

        // Formulas : (rand(categorie) + rand(type)) * typeAsteroide * mult_radio
        $types = Config::get('minerals.types');

        foreach( $types as $type )
        {
            $currentRatio = 0;
            $rand         = mt_rand(0, 100);
            $ratio        = 0;

            /*
            |--------------------------------------------------------------------------
            | Generate type ratio
            |--------------------------------------------------------------------------
            */
            foreach( $type['ratio'] as $purcent => $factor)
            {
                $current += $purcent;

                if ( $rand <= $current )
                {
                    $ratio = mt_rand( $factor[0], $factor[1] );
                    break;
                }
            }
        }
    }
}
