<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateIdSeqToLocationTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("SELECT setval(pg_get_serial_sequence('countries', 'id'), coalesce(max(id)+1, 1), false) FROM countries;");
        DB::statement("SELECT setval(pg_get_serial_sequence('regions', 'id'), coalesce(max(id)+1, 1), false) FROM regions;");
        DB::statement("SELECT setval(pg_get_serial_sequence('cities', 'id'), coalesce(max(id)+1, 1), false) FROM cities;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
