<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase {

	/**
	 * Creates the application.
	 *
	 * @return \Symfony\Component\HttpKernel\HttpKernelInterface
	 */
	public function createApplication()
	{
		$unitTesting = true;

		$testEnvironment = 'testing';

		return require __DIR__.'/../../bootstrap/start.php';
	}

	public function setUp()
    {
        parent::setUp();

        Mail::pretend(true);

		$this->setUpDb();
        // To test auth, we must re-enable filters on the routes
        // By default, filters are disabled in testing
        // Route::enableFilters();
    }

    /**
    * Tear down function for all tests
    *
    */
    public function teardown()
    {
        Mockery::close();
        Sentry::logout();
        Session::flush();
    }

    /**
    * Set up the database for tests
    *
    */
    public function setUpDb()
    {
		Artisan::call('migrate:install');
        Artisan::call('migrate');
/*        Artisan::call('db:seed');*/
    }

}
