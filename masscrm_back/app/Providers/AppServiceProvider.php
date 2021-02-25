<?php declare(strict_types=1);

namespace App\Providers;

use Illuminate\Queue\Events\JobFailed;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (config('app.env') !== 'local') {
            $this->app['request']->server->set('HTTPS', true);
        }

        Queue::failing(function (JobFailed $event) {
            Log::error('Queue Failure', [
                'connectionName' => $event->connectionName,
                'queue' => $event->job->getQueue(),
                'exceptionMessage' => $event->exception->getMessage(),
                'exception' => $event->exception->getTrace(),
            ]);
        });
    }
}
