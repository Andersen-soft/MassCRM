<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DeleteUniqueToCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('companies', static function (Blueprint $table) {
            $table->dropUnique('companies_website_unique');
            $table->dropUnique('companies_linkedin_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('companies', static function (Blueprint $table) {
            $table->unique('website');
            $table->unique('linkedin');
        });
    }
}
