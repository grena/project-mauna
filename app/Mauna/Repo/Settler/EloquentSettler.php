<?php namespace Mauna\Repo\Settler;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;

class EloquentSettler extends RepoAbstract implements RepoInterface, SettlerInterface {

    public function __construct(Model $settler)
    {
        $this->model = $settler;
    }
}