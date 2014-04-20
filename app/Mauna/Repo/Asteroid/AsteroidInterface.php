<?php namespace Mauna\Repo\Asteroid;

use Mauna\Repo\RepoInterface;
use \Asteroid;
use \Ore;

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

    /**
     * Generates ores for the asteroid
     *
     * @param  Asteroid $asteroid Asteroid to modify
     * @return Asteroid with ores
     */
    public function generateOres( Asteroid $asteroid );

    /**
     * Register a ore
     * @param Asteroid $asteroid Asteroid to modify
     * @param Ore $ore Ore to use
     * @return bool
     */
    public function registerOre( Asteroid $asteroid, Ore $ore );

}
