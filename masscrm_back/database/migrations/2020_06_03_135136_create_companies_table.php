<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('name', 150)->unique();
            $table->text('website')->nullable()->unique();
            $table->text('linkedin')->nullable()->unique();
            $table->string('sto_full_name', 150)->nullable();
            $table->string('type', 50)->nullable();
            $table->dateTime('founded')->nullable();
            $table->integer('min_employees')->nullable();
            $table->integer('max_employees')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
