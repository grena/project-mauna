<?php namespace Mauna\Repo;

use Illuminate\Support\ServiceProvider;

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
            return new EloquentAsteroid(new Asteroid);
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