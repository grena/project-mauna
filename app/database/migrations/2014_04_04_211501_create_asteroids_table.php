<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAsteroidsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('asteroids', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('game_id')->unsigned()->index();
			$table->timestamps();

			$table->foreign('game_id')
			      ->references('id')->on('games')
			      ->onDelete('cascade')
			      ->onUpdate('cascade');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('asteroids');
	}

}
