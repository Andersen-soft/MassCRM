<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Change1cProjectToContactSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('contact_sales', static function (Blueprint $table) {
            $table->dropColumn('project_c1');
        });

        Schema::table('contact_sales', static function (Blueprint $table) {
            $table->boolean('project_c1')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('contact_sales', static function (Blueprint $table) {
            $table->string('project_c1', 10)->nullable()->change();
        });
    }
}
