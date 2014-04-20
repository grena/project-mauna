<?php

use Way\Tests\Factory;
use Way\Tests\Should;
use Mockery as m;
use \App;

class AsteroidTest extends TestCase
{
    use Way\Tests\ModelHelpers;

    public function setUp()
    {
        parent::setUp();

        $asteroid = m::mock(new Asteroid);
        $asteroid->shouldReceive('newInstance')->andReturn($asteroid);
        $asteroid->shouldReceive('save')->andReturnNull();

        $this->app->instance('Asteroid', $asteroid);
        $this->repo = new Mauna\Repo\Asteroid\EloquentAsteroid( App::make('Asteroid') );
    }

    public function tearDown()
    {
        unset($this->repo);
    }

    protected function getRepository()
    {
        return $this->repo;
    }

    public function test_generate_type()
    {
        $repo = $this->getRepository();

        $astero = $repo->make();

        $astero = $repo->generateType( $astero );

        Should::notEqual( $astero->type, null );
    }
}
