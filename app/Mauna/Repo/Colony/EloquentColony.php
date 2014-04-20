<?php namespace Mauna\Repo\Colony;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;

class EloquentColony extends RepoAbstract implements RepoInterface, ColonyInterface {

    public function __construct(Model $colony)
    {
        $this->model = $colony;
    }
}