<?php namespace Mauna\Repo;

use Illuminate\Support\ServiceProvider;

use Mauna\Repo\User\EloquentUser;
use \User;
use Mauna\Repo\Asteroid\EloquentAsteroid;
use \Asteroid;
use Mauna\Repo\Building\EloquentBuilding;
use \Building;
use Mauna\Repo\BuildingBlueprint\EloquentBuildingBlueprint;
use \BuildingBlueprint;
use Mauna\Repo\Colony\EloquentColony;
use \Colony;
use Mauna\Repo\Ore\EloquentOre;
use \Ore;
use Mauna\Repo\Settler\EloquentSettler;
use \Settler;
use Mauna\Repo\Game\EloquentGame;
use \Game;

class RepoServiceProvider extends ServiceProvider {

    public function register()
    {
        $app = $this->app;

        $app->bind('Mauna\Repo\User\UserInterface', function($app)
        {
            return new EloquentUser(new User);
        });

        $app->bind('Mauna\Repo\Asteroid\AsteroidInterface', function($app)
        {
            $oreRepo = App::make('Mauna\Repo\Ore\OreInterface');

            return new EloquentAsteroid(new Asteroid, $oreRepo);
        });

        $app->bind('Mauna\Repo\Building\BuildingInterface', function($app)
        {
            return new EloquentBuilding(new Building);
        });

        $app->bind('Mauna\Repo\BuildingBlueprint\BuildingBlueprintInterface', function($app)
        {
            return new EloquentBuildingBlueprint(new BuildingBlueprint);
        });

        $app->bind('Mauna\Repo\Colony\ColonyInterface', function($app)
        {
            return new EloquentColony(new Colony);
        });

        $app->bind('Mauna\Repo\Ore\OreInterface', function ( $app )
        {
            return new EloquentOre( new Ore );
        });

        $app->bind('Mauna\Repo\Settler\SettlerInterface', function($app)
        {
            return new EloquentSettler(new Settler);
        });

        $app->bind('Mauna\Repo\Game\GameInterface', function($app)
        {
            return new EloquentGame(new Game);
        });
    }
}
