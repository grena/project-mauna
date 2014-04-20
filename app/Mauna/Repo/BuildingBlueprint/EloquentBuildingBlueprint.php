<?php namespace Mauna\Repo\BuildingBlueprint;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;

class EloquentBuildingBlueprint extends RepoAbstract implements RepoInterface, BuildingBlueprintInterface {

    public function __construct(Model $buildingBlueprint)
    {
        $this->model = $buildingBlueprint;
    }
}