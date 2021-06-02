<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class FillEmptyContactFullName extends Command
{
    private string $tableName = 'contacts';
    private int $chunkSize = 100;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:fillEmptyFullName';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Fill empty values in contacts 'full_name'";

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
        $query = $this->getContactsQuery();

        $query->chunkById($this->chunkSize, function (Collection $contacts) {
            $this->updateFullNameForChunk($contacts);
        });

        $this->info("The empty values in contacts 'full_name' field has been filled.");

        return 0;
    }

    private function getContactsQuery()
    {
        $columns = ['id', 'first_name', 'last_name'];

        return DB::table($this->tableName)
            ->select($columns)
            ->whereNull('full_name')
            ->orderBy('id');
    }

    private function updateFullNameForChunk(Collection $contactsChunk)
    {
        $values_for_update = [];

        foreach ($contactsChunk as $contact) {
            // Generate full_name and create value for update query (id, 'generated_full_name')
            if (empty($contact->first_name) || empty($contact->last_name)) {
                continue;
            }

            $id = $contact->id;
            $full_name = "{$contact->first_name} {$contact->last_name}";
            $full_name = str_replace("'", "''", $full_name); // Escape single quote
            $values_for_update[] = "({$id}, '{$full_name}')";
        }

        if (!count($values_for_update)) {
            return;
        }

        $values_for_update = implode(', ', $values_for_update);

        DB::update(
            "UPDATE {$this->tableName} SET full_name = tmp.full_name FROM (values {$values_for_update}) as tmp (id, full_name) 
            WHERE {$this->tableName}.id=tmp.id;"
        );
    }
}
