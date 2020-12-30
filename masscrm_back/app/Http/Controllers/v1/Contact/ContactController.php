<?php

declare(strict_types=1);

namespace App\Http\Controllers\v1\Contact;

use App\Commands\Contact\ChangeResponseContactsCommand;
use App\Helpers\Pagination;
use App\Commands\Contact\CreateContactCommand;
use App\Commands\Contact\DestroyContactsCommand;
use App\Commands\Contact\GetContactCommand;
use App\Commands\Contact\UpdateContactCommand;
use App\Commands\Contact\GetContactListCommand;
use App\Http\Requests\Contact\ChangeResponsibleContactRequest;
use App\Http\Requests\Contact\CreateContactRequest;
use App\Http\Requests\Contact\GetContactListRequest;
use App\Http\Requests\Contact\UpdateContactRequest;
use App\Http\Controllers\BaseController;
use App\Http\Requests\DestroyManyRequest;
use App\Models\Contact\Contact;
use Illuminate\Http\Request;
use App\Services\Contact\ContactService;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Contact\Contact as ContactResources;

class ContactController extends BaseController
{
    private ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->middleware('permission:createContact', ['only' => ['store']]);
        $this->middleware('permission:deleteContactById', ['only' => ['destroy']]);
        $this->middleware('permission:deleteListContacts', ['only' => ['destroyMany']]);
        $this->middleware('permission:updateContact', ['only' => ['update']]);
        $this->middleware('permission:showContactById', ['only' => ['show']]);
        $this->middleware('permission:getListContacts', ['only' => ['index']]);

        $this->contactService = $contactService;
    }

    /**
     * @OA\Post(
     *      path="/contacts",
     *      tags={"Contact"},
     *      description="Create contact",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Items(type="object", ref="#/components/schemas/ParamsContactCreate")
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/Contact"),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(CreateContactRequest $request): JsonResponse
    {
        $contact = $this->contactService->addContact(
            new CreateContactCommand(
                $request->get('emails'),
                $request->get('origin'),
                $this->getContactFields($request->toArray()),
                $request->get('phones', []),
                $request->get('social_networks'),
                (bool) $request->get('requires_validation'),
                $request->user(),
                $request->get('company_id', null)
            )
        );

        return $this->success([new ContactResources($contact)]);
    }

    /**
     * @OA\Delete(
     *     path="/contacts/{id}",
     *     tags={"Contact"},
     *     description="Delete contact by id",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(ref="#/components/parameters/id"),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object"),
     *         )
     *     ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function destroy(int $id, Request $request): JsonResponse
    {
        return $this->success(
            $this->dispatchNow(
                new DestroyContactsCommand(
                    [(int)$id],
                    $request->user(),
                )
            ) ?? []
        );
    }

    /**
     * @OA\Post(
     *      path="/contacts/delete-list",
     *      tags={"Contact"},
     *      description="Delete contacts by list id",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"ids"},
     *                 @OA\Property(property="ids", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 example={
     *                    "ids": {1, 2},
     *                }
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object"),
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function destroyMany(DestroyManyRequest $request): JsonResponse
    {
        $command = new DestroyContactsCommand(
            $request->get('ids'),
            $request->user(),
            $request->get('search', []),
            $request->get('page', GetContactListCommand::DEFAULT_PAGE),
            $request->get('limit', GetContactListCommand::DEFAULT_LIMIT)
        );

        return $this->success([$this->contactService->deleteContacts($command)] ?? []);
    }

    /**
     * @OA\Put(
     *      path="/contacts/{id}",
     *      tags={"Contact"},
     *      description="Update contact",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(ref="#/components/schemas/ParamsContactUpdate")
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/Contact"),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function update(int $id, UpdateContactRequest $request): JsonResponse
    {
        $contact =  $this->contactService->updateContact(
            new UpdateContactCommand(
                $id,
                $request->user(),
                $request->get('emails', []),
                $request->get('origin'),
                $request->get('phones'),
                $this->getContactFields($request->toArray()),
                $request->get('colleagues'),
                $request->get('social_networks'),
                (bool) $request->get('requires_validation', false),
                $request->get('company_id'),
            )
        );

        return $this->success([new ContactResources($contact)]);
    }

    /**
     * @OA\Put(
     *      path="/contacts/change-responsible",
     *      tags={"Contact"},
     *      description="Change contact responsible",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/page"),
     *      @OA\Parameter(ref="#/components/parameters/limit"),
     *      @OA\Parameter(ref="#/components/parameters/searchChangeResponsoble"),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/Contact"),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function changeResponsible(ChangeResponsibleContactRequest $request): JsonResponse
    {
        $command = new ChangeResponseContactsCommand(
            $request->get('ids'),
            $request->user(),
            $request->get('search', []),
            $request->get('page', GetContactListCommand::DEFAULT_PAGE),
            $request->get('limit', GetContactListCommand::DEFAULT_LIMIT),
            $request->get('responsibleId')
        );

        $this->contactService->changeResponsible($command);

        return $this->success([]);
    }

    private function getContactFields(array $request): array
    {
        $contactFields = [];
        $contact = new Contact();
        foreach ($request as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $field => $item) {
                    if (is_int($field)) {
                        $field = $key;
                    }
                    if ($contact->isField($field)) {
                        $contactFields[$field] = $item;
                    }
                }
                continue;
            }

            if ($contact->isField($key) && $key !== 'company_id') {
                $contactFields[$key] = $value;
            }
        }

        return $contactFields;
    }

    /**
     * @OA\Get(
     *      path="/contacts/{id}",
     *      tags={"Contact"},
     *      description="Get conctact by id",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/Contact"),
     *          ),
     *      ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function show(int $id): JsonResponse
    {
        $contactId = (new GetContactCommand((int)$id))->getContactId();

        return $this->success([new ContactResources($this->contactService->getContact($contactId))]);
    }

    /**
     * @OA\Get(
     *      path="/contacts",
     *      tags={"Contact"},
     *      description="Get contact list",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/page"),
     *      @OA\Parameter(ref="#/components/parameters/limit"),
     *      @OA\Parameter(ref="#/components/parameters/contactSearh"),
     *      @OA\Parameter(ref="#/components/parameters/contactSort"),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Contact")
     *              ),
     *              @OA\Property(property="meta", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Meta")
     *              ),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(GetContactListRequest $request, Pagination $pagination): JsonResponse
    {
        $command = new GetContactListCommand(
            $request->user(),
            $request->get('search', []),
            $request->get('sort', [])
        );

        $contacts = $this->contactService->getContactListBySearchParams($command)
            ->paginate((int) $request->get('limit', GetContactListCommand::DEFAULT_LIMIT));

        return $this->success(ContactResources::collection($contacts), $pagination->getMeta($contacts));
    }

    /**
     * @OA\GET(
     *     path="/contacts/counter-daily-plan",
     *     tags={"Contact"},
     *     description="Fetch counter daily plan user",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *                 @OA\Property(property="data", type="object",
     *                     required={"count", "expected"},
     *                     @OA\Property(property="count", type="integer", example="10"),
     *                     @OA\Property(property="expected", type="integer", example="25")
     *                )
     *         )
     *     ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function getCounterDailyPlan(Request $request, ContactService $contactService): JsonResponse
    {
        return $this->success($contactService->getCounterDailyPlanUser($request->user()));
    }

    /**
     * @OA\GET(
     *     path="contacts/previous-companies/{id}",
     *     tags={"Contact"},
     *     description="Fetch list previous companies",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *                 @OA\Property(property="data", type="array",
     *                     @OA\Items(type="object",
     *                         required={"company_name", "company_id", "position", "updated_at"},
     *                         @OA\Property(property="company_name", type="string", example="MassCRM Andersen"),
     *                         @OA\Property(property="company_id", type="integer", example=123),
     *                         @OA\Property(property="position", type="boolean", example="DevOps Practice Lead"),
     *                         @OA\Property(property="updated_at", type="boolean", example="25.09.2020"),
     *                    )
     *                )
     *           )
     *     ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function getPreviousCompanies(int $id, ContactService $contactService): JsonResponse
    {
        return $this->success($contactService->getListPreviousCompanies($id));
    }
}
