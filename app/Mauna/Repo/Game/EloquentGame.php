<?php namespace Mauna\Repo\Game;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;

class EloquentGame extends RepoAbstract implements RepoInterface, GameInterface {

    public function __construct(Model $game)
    {
        $this->model = $game;
    }
}