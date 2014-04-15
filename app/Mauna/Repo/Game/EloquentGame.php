<?php namespace Mauna\Repo\Game;

use FD\Repo\RepoAbstract;
use FD\Repo\RepoInterface;

class EloquentGame extends RepoAbstract implements RepoInterface, GameInterface {

    public function __construct(Model $game)
    {
        $this->model = $game;
    }
}