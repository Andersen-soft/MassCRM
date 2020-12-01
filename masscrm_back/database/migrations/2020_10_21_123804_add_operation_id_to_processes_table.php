<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOperationIdToProcessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('processes', static function (Blueprint $table) {
            $table->integer('operation_id')->nullable();
            $table->foreign('operation_id')
                ->references('id')
                ->onDelete('set null')
                ->onUpdate('set null')
                ->on('information_imports');
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
            $table->dropColumn('operation_id');
        });
    }
}
