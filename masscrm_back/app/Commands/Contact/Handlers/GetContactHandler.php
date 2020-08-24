<?php

namespace App\Commands\Contact\Handlers;

use App\Commands\Contact\GetContactCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\Contact\Contact;

class GetContactHandler
{
    public function handle(GetContactCommand $command): Contact
    {
        $contact = Contact::find($command->getContactId());
        if ($contact instanceof Contact){
            return $contact;
        }

        throw new NotFoundException('Contact value(' . $command->getContactId() . ') not found');
    }
}
