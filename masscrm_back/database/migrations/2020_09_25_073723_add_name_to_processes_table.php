<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Process;

class AddNameToProcessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('processes', static function (Blueprint $table) {
            $table->string('status')->change();
            $table->string('type')->change();
            $table->text('name')->nullable();
            $table->text('file_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('processes', static function (Blueprint $table) {
            $table->dropColumn(['name', 'file_path']);
        });
    }
}
