<?php

class Game extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'games';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * A Game has many Asteroids
     */
    public function asteroids()
    {
        return $this->hasMany('Asteroid');
    }

}