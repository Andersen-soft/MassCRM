<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCollectionsToContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('contacts', static function (Blueprint $table) {
            $table->json('email_collection')->nullable();
            $table->json('phone_collection')->nullable();
            $table->json('social_network_collection')->nullable();
            $table->json('colleague_collection')->nullable();
            $table->json('sequence_collection')->nullable();
            $table->json('mail_collection')->nullable();
            $table->json('note_collection')->nullable();
            $table->json('sale_collection')->nullable();
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
        Schema::table('contacts', static function (Blueprint $table) {
            $table->dropColumn([
                'email_collection',
                'phone_collection',
                'social_network_collection',
                'colleague_collection',
                'sequence_collection',
                'mail_collection',
                'note_collection',
                'sale_collection',
                'is_upload_collection']);
        });
    }
}
