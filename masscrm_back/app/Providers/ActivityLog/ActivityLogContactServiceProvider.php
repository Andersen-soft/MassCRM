<?php

namespace App\Providers\ActivityLog;

use App\Commands\ActivityLog\Contact\Handlers\ShowActivityLogContactHandler;
use App\Commands\ActivityLog\Contact\ShowActivityLogContactCommand;
use App\Models\AttachmentFile\ContactAttachment;
use App\Observers\AttachmentFile\ContactAttachmentObserver;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class ActivityLogContactServiceProvider extends ServiceProvider
{
    public function boot()
    {
        ContactAttachment::observe(ContactAttachmentObserver::class);
        $this->registerCommandHandlers();
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
