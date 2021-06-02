<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddContactIdToReportPageLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('report_page_log', function (Blueprint $table) {
            $table->unsignedbigInteger('contact_id')->nullable();

            $table->foreign('contact_id')
                ->references('id')
                ->on('contacts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('report_page_log', function (Blueprint $table) {
            $table->dropColumn('contact_id');
        });
    }
}
