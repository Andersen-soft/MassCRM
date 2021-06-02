<?php

declare(strict_types=1);

namespace App\Console;

use App\Console\Commands\DeleteOldImports;
use App\Console\Commands\DeactivateCompanyVacancy;
use App\Console\Commands\DeleteOldProcesses;
use App\Console\Commands\FixContactCompanyIdActivityLog;
use App\Console\Commands\FixContactDetails;
use App\Console\Commands\LeftOneCompanyIndustry;
use App\Console\Commands\DetachPermission;
use App\Console\Commands\FillEmptyContactFullName;
use App\Console\Commands\ParseFiles;
use App\Console\Commands\WebSocketServer;
use App\Console\Commands\LemlistBlacklistCommand;
use App\Console\Commands\ReplyBlacklistCommand;
use App\Console\Commands\TransferCollectionCompany;
use App\Console\Commands\TransferCollectionContact;
use App\Console\Commands\DeleteDuplicateCompanyCommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        ParseFiles::class,
        WebSocketServer::class,
        LemlistBlacklistCommand::class,
        ReplyBlacklistCommand::class,
        TransferCollectionCompany::class,
        TransferCollectionContact::class,
        DeleteDuplicateCompanyCommand::class,
        DeactivateCompanyVacancy::class,
        DeleteOldProcesses::class,
        DeleteOldImports::class,
        LeftOneCompanyIndustry::class,
        DetachPermission::class,
        FillEmptyContactFullName::class,
        FixContactDetails::class,
        FixContactCompanyIdActivityLog::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
