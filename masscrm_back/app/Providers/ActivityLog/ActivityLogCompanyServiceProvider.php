<?php

namespace App\Providers\ActivityLog;

use App\Commands\ActivityLog\Company\Handlers\ShowActivityLogCompanyHandler;
use App\Commands\ActivityLog\Company\ShowActivityLogCompanyCommand;
use App\Models\AttachmentFile\CompanyAttachment;
use App\Observers\AttachmentFile\CompanyAttachmentObserver;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class ActivityLogCompanyServiceProvider extends ServiceProvider
{
    public function boot()
    {
        CompanyAttachment::observe(CompanyAttachmentObserver::class);
        $this->registerCommandHandlers();
    }

    public function register()
    {
    }

    private function registerCommandHandlers()
    {
        Bus::map([
            ShowActivityLogCompanyCommand::class => ShowActivityLogCompanyHandler::class
        ]);
    }
}
