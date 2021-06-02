<?php

declare(strict_types=1);

namespace App\Providers\ActivityLog;


use App\Models\AttachmentFile\CompanyAttachment;
use App\Observers\AttachmentFile\CompanyAttachmentObserver;

use Illuminate\Support\ServiceProvider;

class ActivityLogCompanyServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        CompanyAttachment::observe(CompanyAttachmentObserver::class);
    }

    public function register()
    {
    }
}
