<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportPageLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report_page_log', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id');
            $table->integer('created')->default(0);
            $table->integer('updated')->default(0);
            $table->bigInteger('activity_log_companies_id')->nullable();
            $table->bigInteger('activity_log_contacts_id')->nullable();
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->foreign('activity_log_companies_id')
                ->references('id')
                ->on('activity_log_companies');

            $table->foreign('activity_log_contacts_id')
                ->references('id')
                ->on('activity_log_contacts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('report_page_log');
    }
}
