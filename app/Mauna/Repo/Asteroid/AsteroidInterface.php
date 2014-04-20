<?php namespace Mauna\Repo\Asteroid;

use Mauna\Repo\RepoInterface;
use \Asteroid;

interface AsteroidInterface extends RepoInterface {

    /**
     * Generate a type for the asteroid (the size)
     *
     * @param  Asteroid $asteroid Asteroid to modify
     * @return Asteroid with the type
     */
    public function generateType( Asteroid $asteroid );

    /**
     * Generates the radioctivity amount for the asteroid
     *
     * @param  Asteroid $asteroid Asteroid to modify
     * @return Asteroid with the radioactivity
     */
    public function generateRadioactivity( Asteroid $asteroid );
}
