<?php

declare(strict_types=1);

namespace App\Providers\ActivityLog;

use App\Commands\ActivityLog\Contact\Handlers\ShowActivityLogContactHandler;
use App\Commands\ActivityLog\Contact\ShowActivityLogContactCommand;
use App\Models\ActivityLog\ActivityLogContact;
use App\Models\AttachmentFile\ContactAttachment;
use App\Observers\ActivityLog\ActivityLogContactsObserver;
use App\Observers\AttachmentFile\ContactAttachmentObserver;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class ActivityLogContactServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        ContactAttachment::observe(ContactAttachmentObserver::class);
        ActivityLogContact::observe(ActivityLogContactsObserver::class);
    }

    public function register()
    {
    }

    private function registerCommandHandlers()
    {
        Bus::map([
            ShowActivityLogContactCommand::class => ShowActivityLogContactHandler::class,
        ]);
    }
}
