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
    }
}
