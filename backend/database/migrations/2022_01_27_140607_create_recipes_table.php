<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id(); 
            $table->string('name');
            $table->string('preparation_time');
            $table->string('portions');
            $table->boolean('fast');
            $table->string('advice');
            $table->integer('views')->nullable();

            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('cuisine_id');
            $table->unsignedBigInteger('user_id');

            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('cuisine_id')->references('id')->on('cuisines');
            $table->foreign('user_id')->references('id')->on('users');

            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
