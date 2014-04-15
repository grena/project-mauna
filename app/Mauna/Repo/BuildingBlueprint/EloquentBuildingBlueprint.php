<?php namespace Mauna\Repo\BuildingBlueprint;

use FD\Repo\RepoAbstract;
use FD\Repo\RepoInterface;

class EloquentBuildingBlueprint extends RepoAbstract implements RepoInterface, BuildingBlueprintInterface {

    public function __construct(Model $buildingBlueprint)
    {
        $this->model = $buildingBlueprint;
    }
}