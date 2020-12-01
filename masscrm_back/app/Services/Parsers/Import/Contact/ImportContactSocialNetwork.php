<?php declare(strict_types=1);

namespace App\Services\Parsers\Import\Contact;

use App\Exceptions\Import\ImportFileException;
use App\Models\Contact\Contact;
use App\Repositories\Contact\ContactSocialNetworksRepository;
use Illuminate\Support\Facades\Lang;
use App\Helpers\Url;

class ImportContactSocialNetwork
{
    private ContactSocialNetworksRepository $socialNetworksRepository;
    private Url $urlHelper;

    public function __construct(ContactSocialNetworksRepository $socialNetworksRepository, Url $urlHelper)
    {
        $this->socialNetworksRepository = $socialNetworksRepository;
        $this->urlHelper = $urlHelper;
    }

    public function merge(Contact $contact, array $row): void
    {
        if (empty($row['contactSocialNetwork']['link'])) {
            return;
        }

        $socialsNetwork = $contact->contactSocialNetworks()->pluck('link')->toArray();

        foreach ($row['contactSocialNetwork']['link'] as $item) {
            if (!in_array($item, $socialsNetwork, true)) {
                if ($this->socialNetworksRepository->checkUniqueness($item)) {
                    throw new ImportFileException([
                        Lang::get('validationModel.social_network.url_already_exist', ['input' => $item])
                    ]);
                }

                $contact->contactSocialNetworks()->create([
                    'link' => $this->urlHelper->getUrlWithSchema(trim($item))
                ]);
            }
        }
    }

    public function replace(Contact $contact, array $row): void
    {
        if (!isset($row['contactSocialNetwork'])) {
            return;
        }

        $contact->contactSocialNetworks()->delete();
        foreach ($row['contactSocialNetwork']['link'] as $item) {
            if ($this->socialNetworksRepository->checkUniqueness($item)) {
                throw new ImportFileException([
                    Lang::get('validationModel.social_network.url_already_exist', ['input' => $item])
                ]);
            }

            $contact->contactSocialNetworks()->create([
                'link' => $this->urlHelper->getUrlWithSchema(trim($item))
            ]);
        }
    }

    public function create(Contact $contact, array $row): void
    {
        $this->replace($contact, $row);
    }
}
