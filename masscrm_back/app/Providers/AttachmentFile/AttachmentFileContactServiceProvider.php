<?php

namespace App\Providers\AttachmentFile;

use App\Commands\AttachmentFile\Contact\{
    CheckExistAttachmentFileContactCommand,
    SaveAttachedFileContactCommand,
    DeleteAttachmentFileContactCommand,
    GetAttachedFileListContactCommand
};

use App\Commands\AttachmentFile\Contact\Handlers\{
    CheckExistAttachmentFileContactHandler,
    SaveAttachedFileContactHandler,
    DeleteAttachmentFileContactHandler,
    GetAttachedFileListContactHandler
};

use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;


class AttachmentFileContactServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerCommandHandlers();
    }

    public function register()
    {
    }

    private function registerCommandHandlers()
    {
        Bus::map([
            CheckExistAttachmentFileContactCommand::class => CheckExistAttachmentFileContactHandler::class,
            SaveAttachedFileContactCommand::class => SaveAttachedFileContactHandler::class,
            DeleteAttachmentFileContactCommand::class => DeleteAttachmentFileContactHandler::class,
            GetAttachedFileListContactCommand::class => GetAttachedFileListContactHandler::class
        ]);
    }
}
