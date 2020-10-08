<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInformationImportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('information_imports', static function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->integer('count_new_contacts');
            $table->integer('count_new_companies');
            $table->integer('count_processed_duplicate_contacts');
            $table->integer('count_processed_duplicate_companies');
            $table->integer('count_missed_duplicates');
            $table->integer('count_unsuccessfully');
            $table->string('file_name_missed_duplicates', 100);
            $table->string('file_name_unsuccessfully_duplicates', 100);
            $table->bigInteger('user_id');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('information_imports');
    }
}
