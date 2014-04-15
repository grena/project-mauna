<?php namespace Mauna\Repo\Asteroid;

use FD\Repo\RepoAbstract;
use FD\Repo\RepoInterface;

class EloquentAsteroid extends RepoAbstract implements RepoInterface, AsteroidInterface {

    public function __construct(Model $asteroid)
    {
        $this->model = $asteroid;
    }
}