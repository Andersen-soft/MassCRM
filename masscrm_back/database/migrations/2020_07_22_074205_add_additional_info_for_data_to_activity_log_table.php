<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdditionalInfoForDataToActivityLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('activity_log_companies', static function (Blueprint $table) {
            $table->text('additional_info_for_data')->nullable();
            $table->text('log_info')->nullable()->change();
        });

        Schema::table('activity_log_contacts', static function (Blueprint $table) {
            $table->text('additional_info_for_data')->nullable();
            $table->text('log_info')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('activity_log_companies', static function (Blueprint $table) {
            $table->dropColumn('additional_info_for_data');
        });

        Schema::table('activity_log_contacts', static function (Blueprint $table) {
            $table->dropColumn('additional_info_for_data');
        });
    }
}
