<?php namespace Mauna\Repo\Asteroid;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;
use \Asteroid;

use \Config;
use \Exception;

class EloquentAsteroid extends RepoAbstract implements RepoInterface, AsteroidInterface {

    public function __construct(Asteroid $asteroid)
    {
        $this->model = $asteroid;
    }

    /**
     * Generate a type for the asteroid (the size)
     *
     * @param  Asteroid $asteroid Asteroid to modify
     * @return Asteroid with the type
     */
    public function generateType(Asteroid $asteroid)
    {
        $types = Config::get('asteroids.types');
        $total_rarity = array_sum(array_pluck($types, 'rarity'));

        $current = 0;
        $rand = mt_float_rand(0, $total_rarity, 1);

        foreach($types as $type)
        {
            $current += $type['rarity'];

            if($rand <= $current)
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
    public function generateRadioactivity(Asteroid $asteroid)
    {
        if (!$asteroid->type) {
            throw new Exception(__METHOD__ . ' : Cannot generate radioactivity on an Asteroid without type');
        }

        // TODO

        $types = Config::get('asteroids.types');
    }
}