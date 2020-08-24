<?php

namespace App\Commands\Contact\Handlers;

use App\Models\Contact\Contact;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use App\Commands\Contact\DestroyContactsCommand;
use App\Http\Transformers\Contact\ContactTransform;
use App\Exceptions\Permission\DeniedExecuteException;

class DestroyContactsHandler
{
    public function handle(DestroyContactsCommand $command): void
    {
        if ($command->getUser()->hasRole(User::USER_ROLE_MANAGER)) {
            Contact::destroy($command->getContactsId());
            return;
        }

        $disableContacts = [];
        $contacts = Contact::query()->whereIntegerInRaw('id', $command->getContactsId())->get();
        foreach ($contacts as $contact) {
            if ($contact->getUserId() !== $command->getUser()->getId()) {
                $disableContacts[] = $contact;
                continue;
            }

            $contact->delete();
        }

        if (!empty($disableContacts)) {
            throw (new DeniedExecuteException())
                ->setData($disableContacts)
                ->setModelTransform(new ContactTransform());
        }
    }
}
