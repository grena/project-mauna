<?php

class Building extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'buildings';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * A Building belongs to only one Colony
     */
    public function colony()
    {
        return $this->belongsTo('Colony');
    }

}