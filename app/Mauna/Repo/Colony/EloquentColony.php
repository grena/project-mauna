<?php namespace Mauna\Repo\Colony;

use FD\Repo\RepoAbstract;
use FD\Repo\RepoInterface;

class EloquentColony extends RepoAbstract implements RepoInterface, ColonyInterface {

    public function __construct(Model $colony)
    {
        $this->model = $colony;
    }
}