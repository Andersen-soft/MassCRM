<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateBlacklistIgnoreDomainsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('blacklist_ignore_domains', static function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('domain')->unique();
        });

        DB::statement('ALTER TABLE blacklist_ignore_domains ALTER COLUMN domain TYPE citext');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('blacklist_ignore_domains');
    }
}
