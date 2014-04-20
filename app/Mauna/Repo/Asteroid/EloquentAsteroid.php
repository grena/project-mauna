<?php namespace Mauna\Repo\Asteroid;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;
use Mauna\Repo\Ore\OreInterface;
use \Asteroid;
use \Ore;
use \Config;
use \Exception;
use \InvalidArgumentException;

class EloquentAsteroid extends RepoAbstract implements RepoInterface, AsteroidInterface {

    protected $ore;

    public function __construct( Asteroid $asteroid, OreInterface $ore )
    {
        $this->model = $asteroid;
        $this->ore   = $ore;
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
            throw new InvalidArgumentException( __METHOD__ . ' : Cannot generate radioactivity on an Asteroid without type' );
        }

        $config = array_first(Config::get('asteroids.types'), function($k, $config) use ($asteroid) {
            return $config['key'] == $asteroid->type;
        });

        $current = 0;
        $rand = mt_rand(0, 100);

        foreach( $config['radioactivity'] as $percent => $values)
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
     * Generates ores for the asteroid
     *
     * @param  Asteroid $asteroid Asteroid to modify
     * @return Asteroid with ores
     */
    public function generateOres( Asteroid $asteroid )
    {
        if ( ! $asteroid->type )
        {
            throw new InvalidArgumentException( __METHOD__ . ' : Cannot generate ores on an Asteroid without type' );
        }

        if ( ! $asteroid->radioactivity )
        {
            throw new InvalidArgumentException( __METHOD__ . ' : Cannot generate ores on an Asteroid without radioactivity' );
        }

        // Formulas : (rand(categorie) + rand(type)) * typeAsteroide * mult_radio
        $categories = Config::get('ores.categories');

        $typeAsteroid = Config::get("asteroids.types.$asteroid->type");

        foreach( $categories as $categorie )
        {
            $currentRatio = 0;
            $rand         = mt_rand(0, 100);
            $ratio        = 0;

            /*
            |--------------------------------------------------------------------------
            | Generate type ratio
            |--------------------------------------------------------------------------
            */
            foreach( $categorie['ratio'] as $purcent => $factor)
            {
                $currentRatio += $purcent;

                if ( $rand <= $currentRatio )
                {
                    $ratio = mt_rand( $factor[0], $factor[1] );
                    break;
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Generate Ores
            |--------------------------------------------------------------------------
            */
            foreach ( $categorie['ores'] as $type => $ratios)
            {
                $currentRatio = 0;
                $rand         = mt_rand(0, 100);
                $ratioOre = 0;

                foreach ( $ratios as $purcent => $factor)
                {
                    $currentRatio += $purcent;

                    if ( $rand <= $currentRatio )
                    {
                        $ratioOre = mt_rand( $factor[0], $factor[1]);
                        break;
                    }
                }

                $amount = ( $ratio + $ratioOre ) * $typeAsteroid['ore_multiplier'] * $asteroid->radioactivity;

                $ore = $this->ore->make( [
                    'type'         => Config::get("ores.types.$type"),
                    'start_amount' => $amount,
                    'amount'       => $amount
                ]);

                $this->registerOre( $asteroid, $ore );
            }
        }
        return $asteroid;
    }

    /**
     * Register a ore
     * @param Asteroid $asteroid Asteroid to modify
     * @param Ore $ore Ore to use
     * @return bool
     */
    public function registerOre( Asteroid $asteroid, Ore $ore )
    {
        if ( ! $asteroid->id )
        {
            $asteroid->save();
        }

        $ore->asteroid_id = $asteroid->id;

        return $ore->save();
    }
}
