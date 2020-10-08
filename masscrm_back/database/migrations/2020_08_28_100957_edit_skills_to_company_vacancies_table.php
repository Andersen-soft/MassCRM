<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EditSkillsToCompanyVacanciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('company_vacancies', static function (Blueprint $table) {
            $table->text('link')->change()->default(null)->nullable();
            $table->text('skills')->change()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('company_vacancies', static function (Blueprint $table) {
        });
    }
}
