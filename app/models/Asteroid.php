<?php

class Asteroid extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'asteroids';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * An Asteroid belongs to only one Game
     */
    public function game()
    {
        return $this->belongsTo('Game');
    }

    /**
     * An Asteroid has one Colony
     */
    public function colony()
    {
        return $this->hasOne('Colony');
    }

    /*
    |--------------------------------------------------------------------------
    | An Asteroid has many Ores
    |--------------------------------------------------------------------------
    */
    public function ores()
    {
        return $this->hasMany('Ore');
    }

}
