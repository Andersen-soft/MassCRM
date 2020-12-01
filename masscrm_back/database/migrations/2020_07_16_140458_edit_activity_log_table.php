<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EditActivityLogTable extends Migration
{
    public function up():void
    {
        Schema::table('activity_log_companies', static function (Blueprint $table) {
            $table->renameColumn('model_id', 'company_id');
            $table->renameColumn('model_type', 'model_name');
            $table->dropColumn('date_old');
            $table->dropColumn('date_new');
            $table->text('data_old')->nullable();
            $table->text('data_new')->nullable();
            $table->string('model_field')->nullable()->change();

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::table('activity_log_contacts', static function (Blueprint $table) {
            $table->renameColumn('model_id', 'contact_id');
            $table->renameColumn('model_type', 'model_name');
            $table->dropColumn('date_old');
            $table->dropColumn('date_new');
            $table->text('data_old')->nullable();
            $table->text('data_new')->nullable();
            $table->string('model_field')->nullable()->change();

            $table->foreign('contact_id')
                ->references('id')
                ->on('contacts')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }


    public function down(): void
    {
        Schema::table('activity_log_companies', static function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->renameColumn('company_id', 'model_id');
            $table->renameColumn('model_name', 'model_type');
            $table->renameColumn('data_old', 'date_old');
            $table->renameColumn('data_new', 'date_new');
        });

        Schema::table('activity_log_contacts', static function (Blueprint $table) {
            $table->dropForeign(['contact_id']);
            $table->renameColumn('contact_id', 'model_id');
            $table->renameColumn('model_name', 'model_type');
            $table->renameColumn('data_old', 'date_old');
            $table->renameColumn('data_new', 'date_new');
        });
    }
}
