<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIndexForContactCampaigns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_campaigns', static function (Blueprint $table) {
            $table->index('contact_id', 'contact_campaigns_contact_id_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contact_campaigns', static function (Blueprint $table) {
            $table->dropIndex('contact_campaigns_contact_id_index');
        });
    }
}
