<?php namespace Mauna\Repo\User;

use Mauna\Repo\RepoAbstract;
use Mauna\Repo\RepoInterface;

class EloquentUser extends RepoAbstract implements RepoInterface, UserInterface {

    public function __construct(Model $user)
    {
        $this->model = $user;
    }
}