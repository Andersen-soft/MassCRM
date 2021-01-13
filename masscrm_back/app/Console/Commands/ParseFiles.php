<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Imports\Contact\Parsers\ParserReplayCsvService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

/**
 * Class ParseFiles
 * @package App\Console\Commands
 */
class ParseFiles extends Command
{
    private ParserReplayCsvService $parserReplayCsvService;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse:files';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process for starting parsing files';

    public function __construct(ParserReplayCsvService $parserReplayCsvService)
    {
        parent::__construct();
        $this->parserReplayCsvService = $parserReplayCsvService;
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $path = storage_path('files');
        if (!file_exists($path) && !is_dir($path)) {
            $this->error("Failed to open dir({$path}): No such directory");
            return;
        }

        $fileNames = array_diff(scandir($path), ['.', '..']);
        foreach ($fileNames as $fileName) {
            $fullPath = $path . '/' . $fileName;
            if (!File::exists($fullPath)) {
                $this->error("File({$fileName}) no such in directory: " . $path);
                continue;
            }

            $this->parserReplayCsvService->parse($fullPath);
        }
    }
}
