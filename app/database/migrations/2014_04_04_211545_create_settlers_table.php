<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSettlersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('settlers', function(Blueprint $table) {

			$table->increments('id');
			$table->integer('user_id')->unsigned()->index();
			$table->integer('colony_id')->unsigned()->index();
			$table->string('name');
			$table->enum('sex', array('male', 'female'));
			$table->timestamps();

			$table->foreign('user_id')
			      ->references('id')->on('users')
			      ->onDelete('cascade')
			      ->onUpdate('cascade');

			$table->foreign('colony_id')
			      ->references('id')->on('colonies')
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
		Schema::drop('settlers');
	}

}
