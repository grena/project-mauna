<?php namespace Mauna\Repo;

interface RepoInterface {

    /*
    |--------------------------------------------------------------------------
    | Make a new model entity
    |--------------------------------------------------------------------------
    */
    public function make( array $attributes = array() );

}
