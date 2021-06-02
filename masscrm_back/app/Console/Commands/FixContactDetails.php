<?php

namespace App\Console\Commands;

use App\Models\Contact\Contact;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;

class FixContactDetails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:fix_details';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Contact::query()
            ->where(static function (Builder $query) {
                $query->orWhereRaw("first_name like '%Добр%'")
                    ->orWhereRaw("first_name like '%Monsieur%'")
                    ->orWhereRaw("first_name like '%geehrter%'");
            })
            ->whereNotNull('last_name')
            ->chunk(100, function ($items) {
                foreach($items as $item) {
                    if (mb_strripos($item->first_name, 'Добр', 0, 'UTF-8') !== false) {
                        $item->withoutEvents(
                            function () use ($item) {
                                $item->first_name = str_replace('Добрый день, ', '', $item->first_name);
                                $item->first_name = str_replace('!', '', $item->first_name);
                                $item->update(['first_name' => $item->first_name]);
                            }
                        );
                        continue;
                    }
                    if (strripos($item->first_name, 'Monsieur')) {
                        $item->withoutEvents(
                            function () use ($item) {
                                $item->first_name = str_replace('Bonjour Monsieur ', '', $item->first_name);
                                $item->update(['first_name' => $item->last_name, 'last_name' => $item->first_name]);
                            }
                        );
                        continue;
                    }
                    if (strripos($item->first_name, 'geehrter')) {
                        $item->withoutEvents(
                            function () use ($item) {
                                $item->first_name = str_replace('Sehr geehrter Herr ', '', $item->first_name);
                                $item->update(['first_name' => $item->last_name, 'last_name' => $item->first_name]);
                            }
                        );
                        continue;
                    }
                }
            });
    }
}
