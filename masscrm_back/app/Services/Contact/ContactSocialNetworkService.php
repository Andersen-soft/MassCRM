<?php

declare(strict_types=1);

namespace App\Services\Contact;

use App\Exceptions\Validation\ValidationRequestException;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactSocialNetworks;
use App\Services\TransferCollection\TransferCollectionContactService;
use Illuminate\Support\Facades\Lang;
use App\Repositories\Contact\ContactSocialNetworksRepository;

class ContactSocialNetworkService
{
    private TransferCollectionContactService $transferCollectionContactService;
    private ContactSocialNetworksRepository $contactSocialNetworksRepository;

    public function __construct(
        TransferCollectionContactService $transferCollectionContactService,
        ContactSocialNetworksRepository $contactSocialNetworksRepository
    ) {
        $this->contactSocialNetworksRepository = $contactSocialNetworksRepository;
        $this->transferCollectionContactService = $transferCollectionContactService;
    }

    public function updateSocialNetworks(Contact $contact, ?array $socialNetworks): void
    {
        if (!isset($socialNetworks)) {
            return;
        }

        $contactSocial = $contact->contactSocialNetworks()->pluck('link', 'id')->toArray();
        foreach ($socialNetworks as $key => $socialNetwork) {
            $socialKey = array_search($socialNetwork, $contactSocial, true);
            if ($socialKey !== false) {
                unset($contactSocial[$socialKey]);
                continue;
            }

            $contact->contactSocialNetworks()->create([
                'link' => $socialNetwork
            ]);
        }

        if (!empty($contactSocial)) {
            ContactSocialNetworks::destroy(array_keys($contactSocial));
        }

        $contact->social_network_collection = $this->transferCollectionContactService->getSocialNetworks($contact);
        $contact->save();
    }

    public function addSocialNetworks(Contact $contact, ?array $socialNetworks): void
    {
        if (empty($socialNetworks)) {
            return;
        }

        foreach ($socialNetworks as $link) {
            $contact->contactSocialNetworks()->create([
                'link' => $link
            ]);
        }
    }
}
