<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('company_id')->nullable();
            $table->string('responsible', 150)->nullable();
            $table->string('first_name', 50)->nullable();
            $table->string('last_name', 50)->nullable();
            $table->string('full_name', 150)->nullable();
            $table->string('gender', 10)->nullable();
            $table->dateTime('birthday')->nullable();
            $table->string('country', 50)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('region', 150)->nullable();
            $table->text('position')->nullable();
            $table->text('linkedin')->nullable()->unique();
            $table->string('skype', 60)->nullable();
            $table->dateTime('last_touch')->nullable();
            $table->text('location')->nullable();
            $table->dateTime('added_to_mailing')->nullable();
            $table->string('mailing_tool', 50)->nullable();
            $table->string('origin', 50)->nullable();
            $table->integer('opens')->nullable();
            $table->integer('views')->nullable();
            $table->integer('deliveries')->nullable();
            $table->integer('replies')->nullable();
            $table->integer('bounces')->nullable();
            $table->integer('confidence')->nullable();
            $table->bigInteger('service_id')->nullable();

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->onUpdate('cascade')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
