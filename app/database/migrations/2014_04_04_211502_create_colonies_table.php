<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateColoniesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('colonies', function(Blueprint $table) {

			$table->increments('id');
			$table->integer('asteroid_id')->unsigned()->index();
			$table->string('name');
			$table->timestamps();

			$table->foreign('asteroid_id')
			      ->references('id')->on('asteroids')
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
		Schema::drop('colonies');
	}

}
