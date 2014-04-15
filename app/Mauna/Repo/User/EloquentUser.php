<?php namespace Mauna\Repo\User;

use FD\Repo\RepoAbstract;
use FD\Repo\RepoInterface;

class EloquentUser extends RepoAbstract implements RepoInterface, UserInterface {

    public function __construct(Model $user)
    {
        $this->model = $user;
    }
}