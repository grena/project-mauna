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

        $this->app->instance('Asteroid', $asteroid);

        $mineralRepo = m::mock(App::make('Mauna\Repo\Ore\OreInterface'));
        $this->app->instance('Mauna\Repo\Ore\OreInterface', $mineralRepo);

        $this->repo = new Mauna\Repo\Asteroid\EloquentAsteroid(
            App::make('Asteroid'),
            App::make('Mauna\Repo\Ore\OreInterface')
        );
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
        $available_types = array_pluck(\Config::get('asteroids.types'), 'key');

        $astero = $repo->make();

        $astero = $repo->generateType( $astero );

        // Function sould return an object
        Should::notEqual( $astero, null );
        // Function should hydrate property 'type' of object
        Should::notEqual( $astero->type, null );
        // Property 'type' of object sould be defined in configuration
        Should::have( $astero->type, $available_types );
    }

    public function test_generate_radioactivity()
    {
        $repo = $this->getRepository();
        $type_tested = 't1';

        // Let's retrieve all radioactivity values for a t1 type asteroid
        $config = array_first(Config::get('asteroids.types'), function($k, $config) use ($type_tested) {
            return $config['key'] == $type_tested;
        });

        $all = array_flatten($config['radioactivity']);

        // All radioactivity values for a t1 type asteroid
        $available_radioactivity = range(min($all), max($all));

        $astero = $repo->make();
        $astero->type = $type_tested;

        $astero = $repo->generateRadioactivity( $astero );

        // Function sould return an object
        Should::notEqual( $astero, null );
        // Function should hydrate property 'radioactivity' of object
        Should::notEqual( $astero->radioactivity, null );
        // Property 'radioactivity' of object sould be an int
        Should::beTrue( true, is_int($astero->radioactivity) );
        // Property 'radioactivity' should be in a distinct range for the asteroid type
        Should::have( $astero->radioactivity, $available_radioactivity );
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_generate_radioactivity_exception()
    {
        $repo = $this->getRepository();
        $astero = $repo->make();

        $astero = $repo->generateRadioactivity( $astero );
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_generate_radioactivity_throw()
    {
        $repo = $this->getRepository();

        $astero = $repo->make();

        $astero = $repo->generateRadioactivity( $astero );
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_generate_minerals_throw()
    {
        $repo = $this->getRepository();

        $astero = $repo->make();

        $astero = $repo->generateRadioactivity( $astero );
        $astero = $repo->generateOres( $astero );
    }

    public function test_generate_minerals()
    {
        $repo = $this->getRepository();

        $astero = $repo->make();

        $astero->game_id = 1;

        $astero = $repo->generateType( $astero );

        $astero = $repo->generateRadioactivity( $astero );

        $astero = $repo->generateOres( $astero );

        $count = $astero->ores()->count();

        Should::eq($count, count( Config::get('ores.types') ) );
        
    }
}
