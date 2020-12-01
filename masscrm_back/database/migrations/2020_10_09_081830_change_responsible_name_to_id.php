<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeResponsibleNameToId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn('responsible');
            $table->bigInteger('responsible_id')->nullable();
            $table->foreign('responsible_id')
                ->references('id')
                ->onDelete('set null')
                ->onUpdate('set null')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn('responsible_id');
            $table->string('responsible', 150)->nullable();
        });
    }
}
