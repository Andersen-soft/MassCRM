<?php

namespace App\Console;

use App\Console\Commands\{
    ParseFiles,
    WebSocketServer,
    LemlistBlacklistCommand,
    ReplyBlacklistCommand,
    TransferCollectionCompany,
    TransferCollectionContact
};
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
        TransferCollectionContact::class

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
