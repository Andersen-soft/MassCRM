<?php

namespace App\Providers\AttachmentFile;

use App\Commands\AttachmentFile\Company\{
    CheckExistAttachmentFileCompanyCommand,
    SaveAttachedFileCompanyCommand,
    GetAttachedFileListCompanyCommand,
    DeleteAttachmentFileCompanyCommand
};

use App\Commands\AttachmentFile\Company\Handlers\{
    CheckExistAttachmentFileCompanyHandler,
    SaveAttachedFileCompanyHandler,
    GetAttachedFileListCompanyHandler,
    DeleteAttachmentFileCompanyHandler
};

use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;


class AttachmentFileCompanyServiceProvider extends ServiceProvider
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
            CheckExistAttachmentFileCompanyCommand::class => CheckExistAttachmentFileCompanyHandler::class,
            SaveAttachedFileCompanyCommand::class => SaveAttachedFileCompanyHandler::class,
            GetAttachedFileListCompanyCommand::class => GetAttachedFileListCompanyHandler::class,
            DeleteAttachmentFileCompanyCommand::class => DeleteAttachmentFileCompanyHandler::class
        ]);
    }
}
