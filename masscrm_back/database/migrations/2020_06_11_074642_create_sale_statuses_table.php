<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaleStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('sale_statuses', static function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('name', 100);
            $table->boolean('active')->default(true);
        });

        Schema::table('contact_sales', static function (Blueprint $table) {
            $table->dropColumn('status');
            $table->bigInteger('status_id')->nullable();
            $table->foreign('status_id')
                ->references('id')
                ->on('sale_statuses')
                ->onUpdate('cascade')
                ->onDelete('set null');
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
            $table->dropColumn('status_id');
            $table->string('status', 50)->nullable();
        });
        Schema::dropIfExists('sale_statuses');
    }
}
