<?php namespace Mauna\Repo\Building;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;

class EloquentBuilding extends RepoAbstract implements RepoInterface, BuildingInterface {

    public function __construct(Model $building)
    {
        $this->model = $building;
    }
}