<?php

class Colony extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'colonies';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * A Colony belongs to only one Asteroid
     */
    public function asteroid()
    {
        return $this->belongsTo('Asteroid');
    }

    /**
     * A Colony has many Settlers
     */
    public function settlers()
    {
        return $this->hasMany('Settler');
    }

    /**
     * A Colony has many Buildings
     */
    public function buildings()
    {
        return $this->hasMany('Building');
    }

}