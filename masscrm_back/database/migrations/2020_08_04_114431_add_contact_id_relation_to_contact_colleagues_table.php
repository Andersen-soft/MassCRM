<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Contact\ContactColleagues;

class AddContactIdRelationToContactColleaguesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('contact_colleagues', static function (Blueprint $table) {
            $table->bigInteger('contact_id_relation')->nullable();
            $table->string('full_name')->default('Test to the Test');
            $table->dropColumn(['first_name', 'last_name', 'middle_name']);

            $table->foreign('contact_id_relation')
                ->references('id')
                ->on('contacts')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('contact_colleagues', static function (Blueprint $table) {
            ContactColleagues::query()->whereNotNull('contact_id_relation')->delete();
            $table->dropColumn(['contact_id_relation', 'full_name']);
            $table->string('first_name', 50)->nullable();
            $table->string('last_name', 50)->nullable();
            $table->string('middle_name', 50)->nullable();
        });
    }
}
