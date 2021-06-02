<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnsInInformationImportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('information_imports', function (Blueprint $table) {
            $table->string('file_name_missed_duplicates',100)->nullable()->change();
            $table->string('file_name_unsuccessfully_duplicates',100)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('information_imports', function (Blueprint $table) {
            $table->string('file_name_missed_duplicates',100)->nullable(false)->change();
            $table->string('file_name_unsuccessfully_duplicates',100)->nullable(false)->change();
        });
    }
}
