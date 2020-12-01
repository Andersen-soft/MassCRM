<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User\User;

class AddNameToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('users', static function (Blueprint $table) {
            User::truncate();
            $table->string('login', 50)->unique();
            $table->string('name', 50);
            $table->string('surname', 50);
            $table->string('position');
            $table->text('comment')->nullable();
            $table->text('password')->nullable()->change();
            $table->boolean('from_active_directory')->default(0);
            $table->boolean('allow_setting_password')->default(1);
            $table->dropColumn('token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('users', static function (Blueprint $table) {
            $table->dropColumn([
                'login',
                'name',
                'surname',
                'position',
                'comment',
                'from_active_directory',
                'allow_setting_password'
            ]);
            $table->text('token')->nullable();
        });
    }
}
