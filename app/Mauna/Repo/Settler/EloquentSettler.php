<?php namespace Mauna\Repo\Settler;

use FD\Repo\RepoAbstract;
use FD\Repo\RepoInterface;

class EloquentSettler extends RepoAbstract implements RepoInterface, SettlerInterface {

    public function __construct(Model $settler)
    {
        $this->model = $settler;
    }
}