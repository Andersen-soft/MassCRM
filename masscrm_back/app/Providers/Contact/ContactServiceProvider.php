<?php

namespace App\Providers\Contact;

use App\Models\Contact\Contact;
use App\Models\Contact\ContactSocialNetworks;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactColleagues;
use App\Models\Contact\ContactCampaigns;

use App\Observers\Contact\ContactObserver;
use App\Observers\Contact\ContactSocialNetworksObserver;
use App\Observers\Contact\ContactEmailsObserver;
use App\Observers\Contact\ContactColleaguesObserver;
use App\Observers\Contact\ContactCampaignsObserver;

use App\Commands\Contact\CreateContactCommand;
use App\Commands\Contact\GetContactCommand;

use App\Commands\Contact\Handlers\CreateContactHandler;
use App\Commands\Contact\Handlers\GetContactHandler;

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
            GetContactCommand::class => GetContactHandler::class,
        ]);
    }
}
