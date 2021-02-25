<?php

declare(strict_types=1);

namespace App\Imports\Contact\Parsers;

use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\Industry;
use App\Repositories\Contact\ContactEmailsRepository;
use App\Services\Location\LocationService;
use App\Imports\Contact\Parsers\Mapping\IndustryMapping;
use App\Services\TransferCollection\TransferCollectionCompanyService;
use App\Services\TransferCollection\TransferCollectionContactService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

/**
 * Class ParserReplayCsvService
 * @package App
 */
class ParserReplayCsvService extends ParserMain implements ParserServiceInterface
{
    protected const MAILING_TOOL = 'Reply';
    protected const FIRST_NAME = 'First Name';
    protected const LAST_NAME = 'Last Name';
    protected const FULL_NAME = 'Full Name';
    protected const GENDER = 'Gender';
    protected const CONFIDENCE = 'Confidence';
    protected const POSITION = 'Position';
    protected const ID = 'id';
    protected const ADDED_ON = 'Added On';
    protected const LAST_TOUCH = 'Last Touch';
    protected const OPENS = 'Opens';
    protected const VIEWS = 'Views';
    protected const DELIVERIES = 'Deliveries';
    protected const REPLIES = 'Replies';
    protected const BOUNCES = 'Bounces';
    protected const CONTACT_FIELDS = [
        self::FIRST_NAME,
        self::LAST_NAME,
        self::FULL_NAME,
        self::GENDER,
        self::CONFIDENCE,
        self::POSITION,
        self::ID,
        self::ADDED_ON,
        self::LAST_TOUCH,
        self::OPENS,
        self::VIEWS,
        self::DELIVERIES,
        self::REPLIES,
        self::BOUNCES
    ];

    protected const COUNTRY = 'Country';
    protected const STATE = 'State';
    protected const CITY = 'City';
    protected const LOCATION_FIELDS = [
        self::CITY, self::STATE, self::COUNTRY
    ];

    protected const LEAD_STATUS = 'Lead Status';
    protected const SALES = 'Sales';
    protected const WHEN_WRITE = 'Когда написать';
    protected const INBOX_CATEGORY = 'InboxCategory';
    protected const COMMENTS_FIELDS = [
        self::LEAD_STATUS, self::SALES, self::WHEN_WRITE, self::INBOX_CATEGORY
    ];

    protected const URL = 'Url';
    protected const LINDEDIN = 'LinkedIn';
    protected const COMPANY = 'Company';
    protected const WEBSITE = 'Website';
    protected const COMPANY_SIZE = 'Company Size';
    protected const INDUSTRY = 'Industry';
    protected const EMAIL = 'Email';
    protected const PHONE = 'Phone';
    protected const SEQUENCE = 'Sequence';
    protected const STATUS = 'Status';

    protected array $line = [];
    protected ContactEmailsRepository $contactEmailRepository;
    protected IndustryMapping $industryMapping;
    protected LocationService $locationService;
    private TransferCollectionCompanyService $transferCollectionCompanyService;
    private TransferCollectionContactService $transferCollectionContactService;

    public function __construct(
        ContactEmailsRepository $contactEmailRepository,
        IndustryMapping $industryMapping,
        LocationService $locationService,
        TransferCollectionCompanyService $transferCollectionCompanyService,
        TransferCollectionContactService $transferCollectionContactService
    ) {
        $this->contactEmailRepository = $contactEmailRepository;
        $this->industryMapping = $industryMapping;
        $this->locationService = $locationService;
        $this->transferCollectionCompanyService = $transferCollectionCompanyService;
        $this->transferCollectionContactService = $transferCollectionContactService;
    }

    public function parse(string $pathToFile): void
    {
        $file = fopen($pathToFile, 'r+');
        $this->headers = fgetcsv($file, 0, ',');
        $count = 0;
        while (($line = fgetcsv($file, 0, ',')) !== false) {
            $count++;
            var_dump($count);
            try {
                $this->line = array_combine($this->headers, array_map(function ($field) {
                    return trim($field);
                }, $line));

                if (!isset($this->line[self::EMAIL]) || $this->line[self::EMAIL] === '') {
                    Log::error('Invalid Email. Line: ' . json_encode($this->line));
                    continue;
                }
                if ($this->contactEmailRepository->checkUniqueness($this->line[self::EMAIL])) {
                    Log::error('Email is not a unique: ' . $this->line[self::EMAIL]);
                    Log::error('Line: ' . json_encode($this->line));
                    continue;
                }

                $contact = (new Contact())
                    ->setMailingTool(self::MAILING_TOOL);

                foreach (self::CONTACT_FIELDS as $field) {
                    if (!isset($this->line[$field]) || $this->line[$field] === '') {
                        continue;
                    }
                    $this->changContact($field, $contact, $this->line[$field]);
                }
                $this->addLocation($contact);

                $links = $this->getLinks(
                    $this->line[self::URL] ?? '',
                    $this->line[self::LINDEDIN] ?? ''
                );
                $contact->setLinkedin($links['linkedin']);

                $company = $this->createOrGetCompany();
                if ($company instanceof Company) {
                    $contact->company()->associate($company);
                    $this->transferCollectionCompanyService->updateCollectionCompany($company);
                }

                $contact->scopeWithoutTimestamps()->save();
                $this->transferCollectionContactService->updateCollectionContact($contact);

                try {
                    $contact->contactEmails()->create([
                        'email' => $this->line[self::EMAIL],
                        'verification' => false
                    ]);
                } catch (\Exception $exception) {
                    Log::error($exception->getMessage());
                    Log::error('Line: ' . json_encode($this->line));
                    $contact->delete();
                    continue;
                }

                if (isset($this->line[self::PHONE]) && $this->line[self::PHONE] !== '') {
                    $contact->contactPhones()->create(['phone' => $this->line[self::PHONE]]);
                }

                if ($links['other']) {
                    $contact->contactSocialNetworks()->create(['link' => $links['other']]);
                }
                $comments = $this->getComments();
                if (!empty($comments)) {
                    $contact->setComment(implode(";\n", $comments))->save();
                }

                $seq = $this->getSequences(
                    $this->line[self::SEQUENCE] ?? '',
                    $this->line[self::STATUS] ?? ''
                );
                if (!empty($seq)) {
                    $contact->sequences()->saveMany($seq);
                }
            } catch (\Exception $exception) {
                Log::error($exception->getMessage());
                Log::error('Line: ' . json_encode($this->line));
            }
        }

        fclose($file);
    }

    private function addLocation(Contact &$contact): void
    {
        $location = null;
        foreach (self::LOCATION_FIELDS as $field) {
            if ($this->line[$field] !== '') {
                $location = $this->line[$field];
                break;
            }
        }
        if ($location) {
            $loc = $this->locationService->findLocations($location);
            if ($loc) {
                $country = $loc->getCountry();
                if ($country) {
                    $contact->setCountry($country->getName());
                }
                $region = $loc->getRegion();
                if ($region) {
                    $contact->setRegion($region->getName());
                }
                $city = $loc->getCity();
                if ($city) {
                    $contact->setCity($city->getName());
                }
            } else {
                $contact->setComment($location);
            }
        }
    }

    private function changContact(string $field, Contact &$contact, string $value): void
    {
        switch ($field) {
            case self::FIRST_NAME:
                $contact->setFirstName($value);
                break;
            case self::LAST_NAME:
                $contact->setLastName($value);
                break;
            case self::FULL_NAME:
                $contact->setFullName($value);
                break;
            case self::GENDER:
                $contact->setGender($value);
                break;
            case self::CONFIDENCE:
                $contact->setConfidence((int) $value);
                break;
            case self::POSITION:
                $contact->setPosition($value);
                break;
            case self::ID:
                $contact->setServiceId((string) $value);
                break;
            case self::ADDED_ON:
                $contact->setAddedToMailing(Carbon::parse($value));
                break;
            case self::LAST_TOUCH:
                $contact->setLastTouch(Carbon::parse($value));
                break;
            case self::OPENS:
                $contact->setOpens((int) $value);
                break;
            case self::VIEWS:
                $contact->setViews((int) $value);
                break;
            case self::DELIVERIES:
                $contact->setDeliveries((int) $value);
                break;
            case self::REPLIES:
                $contact->setReplies((int) $value);
                break;
            case self::BOUNCES:
                $contact->setBounces((int) $value);
                break;
        }
    }

    private function getLinks(string $url, string $linkedin): array
    {
        $links = [
            'other' => null,
            'linkedin' => null,
        ];
        if (strpos($linkedin, self::LINKEDIN_URL) !== false) {
            $links['linkedin'] = $linkedin;
        } elseif (strpos($url, self::LINKEDIN_URL) !== false) {
            $links['linkedin'] = $url;
        }

        if ($url !== '' && $links['linkedin'] !== $url && filter_var($url, FILTER_VALIDATE_URL) !== false) {
            $links['other'] = $url;
        }

        return $links;
    }

    private function getComments(): array
    {
        $comments = [];
        foreach (self::COMMENTS_FIELDS as $field) {
            if (!isset($this->line[$field]) || $this->line[$field] === '') {
                continue;
            }
            $comments[] = ('[' . $field . '] ' . $this->line[$field]);
        }

        return $comments;
    }

    private function createOrGetCompany(): ?Company
    {
        $companyName = $this->line[self::COMPANY] ?? '';
        $website = $this->line[self::WEBSITE] ?? '';
        $companySize = $this->line[self::COMPANY_SIZE] ?? '';
        $industry = $this->line[self::INDUSTRY] ?? '';

        $company = Company::where('name', $companyName)->orWhere('website', $website)->first();

        if ($company instanceof Company) {
            return $company;
        }

        if ($companyName !== '') {
            $company = (new Company())->setName($companyName);
            if ($website !== '') {
                $company->setWebsite($website);
            }
            if ($companySize !== '') {
                $size = $this->getSizes($companySize);
                $company->setMinEmployees($size['min']);
                $company->setMaxEmployees($size['max']);
            }
            $company->save();
            if ($industry !== '') {
                $industryName = $industry;
                if (in_array($industryName, array_keys($this->industries))) {
                    $company->industries()->sync($this->industries[$industryName]);
                    return $company;
                }
                $industry = $this->industryMapping->findIndustry($industryName);
                if ($industry instanceof Industry) {
                    $this->industries[$industryName] = $industry;
                    $company->industries()->sync($industry);
                }
            }
            return $company;
        }

        return null;
    }
}
