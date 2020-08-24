<?php

namespace App\Services\Parsers\Mapping;

use App\Models\Industry;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class IndustryMapping
{
    protected const MAPPING_FILE = 'industries.csv';

    protected array $industriesInFile = [];
    protected array $industries = [];
    protected array $notIndustries = [];

    public function __construct()
    {
        $this->parseMappingFile(storage_path('mapping/') . self::MAPPING_FILE);
    }

    public function findIndustry(string $name): ?Industry
    {
        if (in_array($name, $this->notIndustries)) {
            return null;
        }

        foreach ($this->industriesInFile as $key => $industryNames) {
            if (in_array($name, $industryNames)) {
                $name = $key;
                break;
            }
        }
        if (in_array($name, $this->industries)){
            return $this->industries[$name];
        }

        $industry = Industry::where('name', $name)->first();
        if ($industry instanceof Industry) {
            $this->industries[$name] = $industry;
            return $industry;
        }

        $this->notIndustries[] = $name;
        return null;
    }

    private function parseMappingFile(string $filePath): void
    {
        if (!File::exists($filePath)) {
            Log::error('Industries mapping file not found in: ' . $filePath);
            return;
        }
        $file = fopen($filePath, 'r+');
        fgetcsv($file, 0, ',');
        while (($line = fgetcsv($file, 0, ',')) !== FALSE) {
            //$line[1] industry name in parse file
            //$line[2] industry name in our system
            if (!isset($line[1]) || !isset($line[2]) || $line[1] === '' || $line[2] === '') {
                continue;
            }
            $this->industriesInFile[trim($line[2])][] = trim($line[1]);
        }

        fclose($file);
    }
}
