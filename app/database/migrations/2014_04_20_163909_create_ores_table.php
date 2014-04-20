<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ores', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('asteroid_id')->unsigned()->index();
			$table->integer('type')->unsigned()->index();
			$table->integer('start_amount')->unsigned();
			$table->integer('amount')->unsigned();
			$table->timestamps();

			$table->foreign('asteroid_id')->references('id')->on('asteroids');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ores');
	}

}
