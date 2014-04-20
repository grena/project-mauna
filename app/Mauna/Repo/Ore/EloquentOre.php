<?php namespace Mauna\Repo\Ore;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;
use \Ore;
use \Config;
use \Exception;
use \InvalidArgumentException;

class EloquentOre extends RepoAbstract implements RepoInterface, OreInterface {

    public function __construct( Ore $ore )
    {
        $this->model   = $ore;
    }
}
