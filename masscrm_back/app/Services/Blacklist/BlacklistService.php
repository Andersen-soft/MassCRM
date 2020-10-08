<?php

namespace App\Services\Blacklist;

use App\Models\Blacklist;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Repositories\Blacklist\BlacklistRepository;
use App\Repositories\Contact\ContactRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class BlacklistService
{
    private BlacklistRepository $blacklistRepository;
    private ContactRepository $contactRepository;

    public function __construct(BlacklistRepository $blacklistRepository, ContactRepository $contactRepository)
    {
        $this->blacklistRepository = $blacklistRepository;
        $this->contactRepository = $contactRepository;
    }

    public function addNewDomains(array $domains, User $user = null, string $nameService = null): array
    {
        $listBlackDomains = [];

        foreach ($domains as $domain) {
            $newDomain = null;
            $domain = trim($domain);
            $blackDomain = new Blacklist();
            $blackDomain->domain = trim($domain);
            if ($user) {
                $newDomain = $user->blacklists()->save($blackDomain);
                $this->setContactBlackList($domain, $user);
            } elseif ($nameService) {
                $blackDomain->source = $nameService;
                $blackDomain->save();
                $newDomain = $blackDomain;
                $this->setContactBlackList($domain);
            }

            if ($newDomain) {
                $listBlackDomains[] = $newDomain;
            }

            $this->blacklistRepository->deleteEmailsFromDomain($domain);
        }

        return $listBlackDomains;
    }

    public function updateDomain(int $id, string $domain, User $user): Blacklist
    {
        $result = $this->blacklistRepository->getDomain($id);

        if ($domain === $result->domain) {
            return $result;
        }

        $this->setContactBlackList($result->domain, $user, false);
        $result->domain = trim($domain);
        $result = $user->blacklists()->save($result);
        $this->setContactBlackList($domain, $user);

        return $result;
    }

    public function deleteListDomains(array $ids,  User $user): void
    {
        foreach ($ids as $id) {
            $result = $this->blacklistRepository->getDomain($id);
            $this->setContactBlackList($result->domain, $user, false);
            $result->delete();
        }
    }

    public function getListDomains(array $search, array $sort, int $limit): LengthAwarePaginator
    {
        return $this->blacklistRepository->getListDomains($search, $sort)->paginate($limit);
    }

    public function checkEmailInBlackList(string $email): bool
    {
        preg_match(Blacklist::REGEX_EMAIL, $email, $emailMatch);
        preg_match(Blacklist::REGEX_GET_DOMAIN_NAME, $email, $domain);

        if (!$emailMatch && !$domain) {
            $emailMatch[] = $email;
        }

        return $this->blacklistRepository->checkExistDomains(array_merge($emailMatch, $domain));
    }

    public function validateDomain(string $domain): bool
    {
        return preg_match(Blacklist::REGEX_EMAIL, $domain, $matches)
            || preg_match(Blacklist::REGEX_DOMAIN, $domain, $matches);
    }

    public function getDomainFromEmail(string $email): string
    {
        if (preg_match(Blacklist::REGEX_GET_DOMAIN_NAME, $email, $matches)) {
            return $matches[0];
        }

        return '';
    }

    public function setContactBlackList(string $domain, User $user = null, bool $flag = true): void
    {
        $contacts = $this->contactRepository->getListContactExistEmail($domain, $flag);

        /** @var Contact $contact */
        foreach ($contacts as $contact) {
            $contact->in_blacklist = $flag;
            if ($user) {
                $contact->user()->associate($user);
            }
            $contact->save();
        }
    }
}
