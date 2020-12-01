<?php declare(strict_types=1);

namespace App\Providers\AttachmentFile;

use App\Commands\AttachmentFile\Contact\CheckExistAttachmentFileContactCommand;
use App\Commands\AttachmentFile\Contact\Handlers\CheckExistAttachmentFileContactHandler;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class AttachmentFileContactServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->registerCommandHandlers();
    }

    public function register()
    {
    }

    private function registerCommandHandlers(): void
    {
        Bus::map([
            CheckExistAttachmentFileContactCommand::class => CheckExistAttachmentFileContactHandler::class,
        ]);
    }
}
