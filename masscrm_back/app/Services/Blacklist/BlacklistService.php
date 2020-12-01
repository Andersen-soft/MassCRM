<?php declare(strict_types=1);

namespace App\Services\Blacklist;

use App\Models\Blacklist;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Repositories\Blacklist\BlacklistRepository;
use App\Repositories\Contact\ContactRepository;
use Illuminate\Database\Eloquent\Builder;

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

    public function deleteListDomains(array $ids, User $user): void
    {
        foreach ($ids as $id) {
            $result = $this->blacklistRepository->getDomain($id);
            $this->setContactBlackList($result->domain, $user, false);
            $result->delete();
        }
    }

    public function getListDomains(array $search, array $sort): Builder
    {
        return $this->blacklistRepository->getListDomains($search, $sort);
    }

    public function checkEmailInBlackList(string $email): bool
    {
        $parts = [];
        $parts[] = $email;
        $domain = $this->getDomainFromEmail($email);
        if (!empty($domain)) {
            $parts[] = $domain;
        }

        return $this->blacklistRepository->checkExistDomains($parts);
    }

    public function isValidateDomain(string $domain): bool
    {
        return filter_var($domain, FILTER_VALIDATE_EMAIL) ||
            filter_var($domain, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME);
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
