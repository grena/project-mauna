<?php namespace Mauna\Repo\Building;

use FD\Repo\RepoAbstract;
use FD\Repo\RepoInterface;

class EloquentBuilding extends RepoAbstract implements RepoInterface, BuildingInterface {

    public function __construct(Model $building)
    {
        $this->model = $building;
    }
}