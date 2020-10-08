<?php

namespace App\Services\Contact;

use App\Models\Contact\Contact;
use App\Services\TransferCollection\TransferCollectionContactService;

class ContactNotesService
{
    private TransferCollectionContactService $transferCollectionContactService;

    public function __construct(TransferCollectionContactService $transferCollectionContactService)
    {
        $this->transferCollectionContactService = $transferCollectionContactService;
    }

    public function updateNotes(Contact $contact, ?array $notes): void
    {
        if (!isset($notes)) {
            return;
        }

        $contact->notes()->delete();

        foreach ($notes as $note) {
            $contact->notes()->create([
                'message' => $note
            ]);
        }

        $contact->note_collection = $this->transferCollectionContactService->getNote($contact);
        $contact->save();
    }
}
