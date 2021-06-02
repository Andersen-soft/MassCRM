<?php declare(strict_types=1);

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\EventsSubscriber\NotificationUserEventSubscriber;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        'App\Events\ReportPage\CountUpdatedForReportPageEvent' => [
            'App\Listeners\ReportPage\CountUpdatedForReportPageListeners',
        ],
    ];

    /**
     * The subscriber classes to register.
     */
    protected $subscribe = [
        NotificationUserEventSubscriber::class,
    ];
}
