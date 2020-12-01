<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeLogInfoToActivityLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('activity_log_contacts', static function (Blueprint $table) {
            $table->dropColumn(['log_info']);
        });

        Schema::table('activity_log_contacts', static function (Blueprint $table) {
            $table->jsonb('log_info')->nullable();
        });

        Schema::table('activity_log_companies', static function (Blueprint $table) {
            $table->dropColumn(['log_info']);
        });

        Schema::table('activity_log_companies', static function (Blueprint $table) {
            $table->jsonb('log_info')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('activity_log_contacts', static function (Blueprint $table) {
            $table->text('log_info')->nullable()->change();
        });

        Schema::table('activity_log_companies', static function (Blueprint $table) {
            $table->text('log_info')->nullable()->change();
        });
    }
}
