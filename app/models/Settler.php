<?php

class Settler extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'settlers';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * A Settler belongs to only one Colony
     */
    public function colony()
    {
        return $this->belongsTo('Colony');
    }

    /**
     * A Settler belongs to only one User
     */
    public function user()
    {
        return $this->belongsTo('User');
    }

}