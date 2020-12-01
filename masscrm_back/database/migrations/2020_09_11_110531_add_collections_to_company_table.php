<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCollectionsToCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('companies', static function (Blueprint $table) {
            $table->json('industries_collection')->nullable();
            $table->json('vacancies_collection')->nullable();
            $table->json('subsidiaries_collection')->nullable();
            $table->boolean('is_upload_collection')->default(false);
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
            $table->dropColumn([
                'industries_collection',
                'vacancies_collection',
                'is_upload_collection',
                'subsidiaries_collection']);
        });
    }
}
