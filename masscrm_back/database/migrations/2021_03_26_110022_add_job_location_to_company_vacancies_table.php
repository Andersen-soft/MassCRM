<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddJobLocationToCompanyVacanciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company_vacancies', function (Blueprint $table) {
            $table->string('job_country', 50)->nullable();
            $table->string('job_city', 50)->nullable();
            $table->string('job_region', 150)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company_vacancies', function (Blueprint $table) {
            $table->dropColumn('job_country');
            $table->dropColumn('job_city');
            $table->dropColumn('job_region');
        });
    }
}
