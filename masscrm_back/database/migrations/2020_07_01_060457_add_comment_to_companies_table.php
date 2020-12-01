<?php declare(strict_types=1);

use App\Models\Contact\Contact;
use App\Models\User\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCommentToCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('company_comments');

        Schema::table('companies', function (Blueprint $table) {
            $table->text('comment')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('comment');
        });

        Schema::create('company_comments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->text('comment');
            $table->string('author', 50);
            $table->bigInteger('company_id');

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }
}
