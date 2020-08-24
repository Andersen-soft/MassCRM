<?php

namespace App\Providers\Contact;

use App\Models\Contact\{
    Contact,
    ContactSocialNetworks,
    ContactEmails,
    ContactColleagues,
    ContactCampaigns
};

use App\Observers\Contact\{
    ContactObserver,
    ContactSocialNetworksObserver,
    ContactEmailsObserver,
    ContactColleaguesObserver,
    ContactCampaignsObserver
};

use App\Commands\Contact\{
    CreateContactCommand,
    DestroyContactsCommand,
    GetContactCommand,
    GetContactListCommand,
    UpdateContactCommand
};

use App\Commands\Contact\Handlers\{
    CreateContactHandler,
    DestroyContactsHandler,
    GetContactHandler,
    GetContactListHandler,
    UpdateContactHandler
};

use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class ContactServiceProvider extends ServiceProvider
{
    public function boot()
    {
        ContactCampaigns::observe(ContactCampaignsObserver::class);
        ContactSocialNetworks::observe(ContactSocialNetworksObserver::class);
        ContactEmails::observe(ContactEmailsObserver::class);
        ContactColleagues::observe(ContactColleaguesObserver::class);
        Contact::observe(ContactObserver::class);
        $this->registerCommandHandlers();
    }

    public function register()
    {
    }

    private function registerCommandHandlers()
    {
        Bus::map([
            CreateContactCommand::class => CreateContactHandler::class,
            DestroyContactsCommand::class => DestroyContactsHandler::class,
            UpdateContactCommand::class => UpdateContactHandler::class,
            GetContactCommand::class => GetContactHandler::class,
            GetContactListCommand::class => GetContactListHandler::class
        ]);
    }
}
