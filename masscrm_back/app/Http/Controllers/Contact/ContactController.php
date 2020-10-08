<?php

namespace App\Http\Controllers\Contact;

use App\Helpers\Pagination;
use App\Commands\Contact\CreateContactCommand;
use App\Commands\Contact\DestroyContactsCommand;
use App\Commands\Contact\GetContactCommand;
use App\Commands\Contact\UpdateContactCommand;
use App\Commands\Contact\GetContactListCommand;
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
     *             @OA\Schema(
     *                 required={"emails", "requires_validation"},
     *                 @OA\Property(property="emails", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(property="phones", type="array",
     *                     @OA\Items(type="string"),
     *                 ),
     *                 @OA\Property(property="first_name", type="string"),
     *                 @OA\Property(property="last_name", type="string"),
     *                 @OA\Property(property="full_name", type="string"),
     *                 @OA\Property(property="gender", type="string", enum={"f", "m"}),
     *                 @OA\Property(property="linkedin", type="string"),
     *                 @OA\Property(property="requires_validation", type="boolean"),
     *                 @OA\Property(property="location", type="object",
     *                     @OA\Property(property="country", type="string"),
     *                     @OA\Property(property="region", type="string"),
     *                     @OA\Property(property="city", type="string"),
     *                 ),
     *                 @OA\Property(property="position", type="string"),
     *                 @OA\Property(property="colleagues", type="array",
     *                     @OA\Items(type="object",
     *                          @OA\Property(property="link", type="string"),
     *                          @OA\Property(property="full_name", type="string"),
     *                     ),
     *                 ),
     *                 @OA\Property(property="social_networks", type="string"),
     *                 @OA\Property(property="comment", type="string"),
     *                 @OA\Property(property="company_id", type="integer"),
     *                 @OA\Property(property="skype", type="string"),
     *                 @OA\Property(property="last_touch", type="date", format="Y-m-d"),
     *                 @OA\Property(property="mailing_tool", type="string"),
     *                 @OA\Property(property="added_to_mailing", type="date", format="Y-m-d"),
     *                 @OA\Property(property="responsible", type="string"),
     *                 @OA\Property(property="origin", type="string"),
     *                 @OA\Property(property="birthday", type="date", format="Y-m-d"),
     *                 @OA\Property(property="opens", type="integer"),
     *                 @OA\Property(property="views", type="integer"),
     *                 @OA\Property(property="deliveries", type="integer"),
     *                 @OA\Property(property="replies", type="integer"),
     *                 @OA\Property(property="bounces", type="integer"),
     *                 @OA\Property(property="confidence", type="integer"),
     *                 @OA\Property(property="service_id", type="integer"),
     *                 example={
     *                    "emails": {"test1@test.com", "test2@test.com"},
     *                    "phones": {"+375338447755", "+79114477555"},
     *                    "first_name": "first",
     *                    "last_name": "last",
     *                    "full_name": "full",
     *                    "gender": "f",
     *                    "linkedin": "http://test.com/122",
     *                    "requires_validation": 1,
     *                    "location": {
     *                          "country": "Belarus",
     *                          "region": "Vitebsk",
     *                          "city": "Polotsk",
     *                    },
     *                    "colleagues": {
     *                          {"full_name": "Potgraven"}, {"link":"http://test.com/32111"}
     *                    },
     *                    "social_networks": "http://vk.com/1233",
     *                    "comment": "Is good worker",
     *                    "company_id": 1,
     *                    "skype": "skype",
     *                    "last_touch": "2020-03-12",
     *                    "mailing_tool": "replay",
     *                    "added_to_mailing": "2020-03-12",
     *                    "responsible": "Ivan",
     *                    "origin": "origin",
     *                    "birthday": "1995-03-12",
     *                    "opens": 15,
     *                    "views": 1,
     *                    "deliveries": 2,
     *                    "replies": 1,
     *                    "bounces": 0,
     *                    "confidence": 99,
     *                    "service_id": 1235594456,
     *                }
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/Contact"),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(CreateContactRequest $request): JsonResponse
    {
        $contact = $this->dispatchNow(
            new CreateContactCommand(
                $request->get('emails'),
                $request->get('origin'),
                $this->getContactFields($request->toArray()),
                $request->get('colleagues', []),
                $request->get('phones', []),
                $request->get('social_networks'),
                $request->get('requires_validation'),
                $request->user(),
                $request->get('company_id', null)
            )
        );

        return $this->success(new ContactResources($contact));
    }

    /**
     * @OA\Delete(
     *      path="/contacts/{id}",
     *      tags={"Contact"},
     *      description="Delete contact by id",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object"),
     *          )
     *      ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function destroy($id, Request $request): JsonResponse
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
     *              @OA\Property(property="payload", type="object"),
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

        return $this->success($this->contactService->deleteContacts($command) ?? []);
    }

    /**
     * @OA\Put(
     *      path="/contacts/{id}",
     *      tags={"Contact"},
     *      description="Update contact",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="emails", type="array",
     *                     @OA\Items(type="string"),
     *                 ),
     *                 @OA\Property(property="phones", type="array",
     *                     @OA\Items(type="string"),
     *                 ),
     *                 @OA\Property(property="first_name", type="string"),
     *                 @OA\Property(property="last_name", type="string"),
     *                 @OA\Property(property="full_name", type="string"),
     *                 @OA\Property(property="gender", type="string", enum={"f", "m"}),
     *                 @OA\Property(property="linkedin", type="string"),
     *                 @OA\Property(property="requires_validation", type="boolean"),
     *                 @OA\Property(property="location", type="object",
     *                     @OA\Property(property="country", type="string"),
     *                     @OA\Property(property="region", type="string"),
     *                     @OA\Property(property="city", type="string"),
     *                 ),
     *                 @OA\Property(property="position", type="string"),
     *                 @OA\Property(property="social_networks", type="string"),
     *                 @OA\Property(property="skype", type="string"),
     *                 @OA\Property(property="origin", type="string"),
     *                 @OA\Property(property="opens", type="integer"),
     *                 @OA\Property(property="views", type="integer"),
     *                 @OA\Property(property="deliveries", type="integer"),
     *                 @OA\Property(property="replies", type="integer"),
     *                 @OA\Property(property="bounces", type="integer"),
     *                 @OA\Property(property="confidence", type="integer"),
     *                 @OA\Property(property="company_id", type="integer"),
     *                 @OA\Property(property="last_touch", type="date", format="Y-m-d"),
     *                 @OA\Property(property="mailing_tool", type="string"),
     *                 @OA\Property(property="added_to_mailing", type="date", format="Y-m-d"),
     *                 @OA\Property(property="responsible", type="string"),
     *                 @OA\Property(property="birthday", type="date", format="Y-m-d"),
     *                 @OA\Property(property="service_id", type="integer"),
     *                 @OA\Property(property="comment", type="string"),
     *                 @OA\Property(property="note", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 example={
     *                    "emails": {
     *                          "test1@test.com", "test2@test.com"
     *                    },
     *                    "phones": {"+375338447755", "+79114477555"},
     *                    "first_name": "first",
     *                    "last_name": "last",
     *                    "full_name": "full",
     *                    "gender": "f",
     *                    "linkedin": "http://test.com/122",
     *                    "requires_validation": 1,
     *                    "location": {
     *                          "country": "Belarus",
     *                          "region": "Vitebsk",
     *                          "city": "Polotsk",
     *                    },
     *                    "social_networks": "http://vk.com/1265",
     *                    "company_id": 1,
     *                    "skype": "skype",
     *                    "last_touch": "2020-03-12",
     *                    "mailing_tool": "replay",
     *                    "added_to_mailing": "2020-03-12",
     *                    "responsible": "Ivan",
     *                    "origin": "origin",
     *                    "birthday": "1995-03-12",
     *                    "opens": 15,
     *                    "views": 1,
     *                    "deliveries": 2,
     *                    "replies": 1,
     *                    "bounces": 0,
     *                    "confidence": 99,
     *                    "service_id": 1235594456,
     *                    "note": {"test To the test"}
     *                }
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/Contact"),
     *          ),
     *      ),
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
                $request->get('requires_validation', false),
                $request->get('company_id'),
                $request->get('note'),
            )
        );

        return $this->success(new ContactResources($contact));
    }

    private function getContactFields(array $request): array
    {
        $contactFields = [];
        $contact = new Contact();
        foreach ($request as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $field => $item) {
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
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/Contact"),
     *          ),
     *      ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function show($id): JsonResponse
    {
        $contact = $this->dispatchNow(
            new GetContactCommand((int)$id)
        );

        return $this->success(new ContactResources($contact));
    }

    /**
     * @OA\Get(
     *      path="/contacts",
     *      tags={"Contact"},
     *      description="Get contact list",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          name="page",
     *          in="query",
     *          required=false,
     *          description="Current page",
     *          @OA\Schema(type="integer")
     *      ),
     *     @OA\Parameter(
     *          name="limit",
     *          in="query",
     *          required=false,
     *          description="Limit record",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="search",
     *          in="query",
     *          required=false,
     *          style="deepObject",
     *          allowReserved=true,
     *          @OA\Schema(type="object",
     *              @OA\Property(property="responsible", type="array",
     *                  @OA\Items(type="object", @OA\Property(type="string", example="Igor"))
     *              ),
     *              @OA\Property(property="created_at", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="string", format="Y-m-d", example="2014-02-25"),
     *                  @OA\Property(property="max", type="string", format="Y-m-d", example="2014-02-25"),
     *              ),
     *              @OA\Property(property="updated_at", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="string", format="Y-m-d", example="2014-02-25"),
     *                  @OA\Property(property="max", type="string", format="Y-m-d", example="2014-02-25"),
     *              ),
     *              @OA\Property(property="first_name", type="string", example="Annemarie"),
     *              @OA\Property(property="last_name", type="string", example="Keizer"),
     *              @OA\Property(property="full_name", type="string", example="Annemarie Keizer"),
     *              @OA\Property(property="gender", type="array",
     *                  @OA\Items(type="object", @OA\Property(type="string", enum={"m","f"}))
     *              ),
     *              @OA\Property(
     *                  property="birthday",
     *                  type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="string", format="m-d", example="02-30"),
     *                  @OA\Property(property="max", type="string", format="m-d", example="06-25"),
     *              ),
     *              @OA\Property(property="country", type="array",
     *                  @OA\Items(type="object", @OA\Property(type="string", example="russia"))
     *              ),
     *              @OA\Property(property="city", type="array",
     *                  @OA\Items(type="object", @OA\Property(type="string", example="London"))
     *              ),
     *              @OA\Property(property="region", type="array",
     *                  @OA\Items(type="object", @OA\Property(type="string", example="East Midlands"))
     *              ),
     *              @OA\Property(property="position", type="string", example="Product Owner"),
     *              @OA\Property(
     *                  property="linkedin",
     *                  type="string",
     *                  example="https://www.linkedin.com/in/andreaspantelis"
     *              ),
     *              @OA\Property(
     *                  property="social_networks",
     *                  type="string",
     *                  example="https://www.linkedin.com/company/22891"
     *              ),
     *              @OA\Property(property="phone", type="string", example="8014716023"),
     *              @OA\Property(property="skype", type="string", example="napoleon02121804"),
     *              @OA\Property(property="email", type="string", example="robert.naess@nordea.com"),
     *              @OA\Property(property="origin", type="array",
     *                  @OA\Items(type="object", @OA\Property(type="string", example="Kiev"))
     *              ),
     *              @OA\Property(property="requires_validation", type="boolean", example=1),
     *              @OA\Property(property="colleague_name", type="string", example="Christopher"),
     *              @OA\Property(
     *                  property="colleague_link",
     *                  type="string",
     *                  example="https://www.linkedin.com/in/brigitte-buntinx-b2a12313"
     *              ),
     *              @OA\Property(property="mailing_tool", type="array",
     *                  @OA\Items(type="string", type="object", @OA\Property(type="string",example="Reply"))
     *              ),
     *              @OA\Property(property="service_id", type="integer", example=123654),
     *              @OA\Property(property="added_to_mailing", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="date", format="Y-m-d", example="2020-02-25"),
     *                  @OA\Property(property="max", type="date", format="Y-m-d", example="2020-06-25"),
     *              ),
     *              @OA\Property(property="confidence", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="integer", example=25),
     *                  @OA\Property(property="max", type="integer", example=50),
     *              ),
     *              @OA\Property(property="last_touch", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="date", format="Y-m-d", example="2020-02-25"),
     *                  @OA\Property(property="max", type="date", format="Y-m-d", example="2020-02-25"),
     *              ),
     *              @OA\Property(property="sequence", type="string", example="sequence"),
     *              @OA\Property(property="status", type="array",
     *                  @OA\Items(type="object", @OA\Property(type="string", example="Active"))
     *              ),
     *              @OA\Property(property="opens", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="integer", example=25),
     *                  @OA\Property(property="max", type="integer", example=50),
     *              ),
     *              @OA\Property(property="views", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="integer", example=25),
     *                  @OA\Property(property="max", type="integer", example=50),
     *              ),
     *              @OA\Property(property="deliveries", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="integer", example=25),
     *                  @OA\Property(property="max", type="integer", example=50),
     *              ),
     *              @OA\Property(property="replies", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="integer", example=25),
     *                  @OA\Property(property="max", type="integer", example=50),
     *              ),
     *              @OA\Property(property="bounces", type="integer", example=25),
     *              @OA\Property(property="mails", type="string", example="webers@handwick.com"),
     *              @OA\Property(property="my_notes", type="string", example="myNotes test text"),
     *              @OA\Property(property="comment", type="string", example="create new application"),
     *              @OA\Property(property="sale", type="object",
     *                  @OA\Property(property="created_at", type="object",
     *                      required={"min", "max"},
     *                      @OA\Property(property="min", type="string", format="Y-m-d", example="2020-02-25"),
     *                      @OA\Property(property="max", type="string", format="Y-m-d", example="2020-02-25"),
     *                  ),
     *                  @OA\Property(property="source", type="array",
     *                       @OA\Items(type="object", @OA\Property(type="string", example="Testing"))
     *                  ),
     *                  @OA\Property(property="link", type="string", example="http://www.oocllogistics.com"),
     *                  @OA\Property(property="status", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Testing"))
     *                  ),
     *                  @OA\Property(property="project_c1", type="boolean", example=1),
     *              ),
     *              @OA\Property(property="company", type="object",
     *                  @OA\Property(property="name", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Rodenstock"))
     *                  ),
     *                  @OA\Property(property="website", type="string", example="http://www.walvisnest.nl"),
     *                  @OA\Property(
     *                      property="linkedin",
     *                      type="string",
     *                      example="https://www.linkedin.com/company/28619843"
     *                  ),
     *                  @OA\Property(property="sto_full_name", type="string", example="Angelas"),
     *                  @OA\Property(property="founded", type="object",
     *                      required={"min", "max"},
     *                      @OA\Property(property="min", type="date", format="Y-m-d", example="2020-02-25"),
     *                      @OA\Property(property="max", type="date", format="Y-m-d", example="2020-02-25"),
     *                  ),
     *                  @OA\Property(property="industry", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Machinery"))
     *                  ),
     *                  @OA\Property(property="company_size", type="object",
     *                      required={"min", "max"},
     *                      @OA\Property(property="min", type="integer", example=51),
     *                      @OA\Property(property="max", type="integer", example=100),
     *                  ),
     *                  @OA\Property(property="type", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", enum={"Subsidiary", "Holding"}))
     *                  ),
     *                  @OA\Property(property="jobs", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Program Testing"))
     *                  ),
     *                  @OA\Property(property="skills", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Angular"))
     *                  ),
     *                  @OA\Property(property="link", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="jobs.tut.by"))
     *                  ),
     *                  @OA\Property(property="subsidiary", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Casino"))
     *                  ),
     *                  @OA\Property(property="holding", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Somention"))
     *                  ),
     *              ),
     *          ),
     *      ),
     *     @OA\Parameter(
     *          name="sort",
     *          in="query",
     *          required=false,
     *          @OA\Schema(
     *              type="object",
     *              required={"field_name", "type_sort"},
     *              @OA\Property(property="sort", type="object",
     *                  required={"field_name", "type_sort"},
     *                  @OA\Property(property="field_name", type="date", enum={"id","responsible","created_at",
     *                      "updated_at","first_name","last_name","full_name","gender","birthday","country",
     *                      "region","city","position","linkedin","skype","last_touch","added_to_mailing","origin",
     *                      "mailing_tool","confidence","opens","views","deliveries","bounces","replies","service_id",
     *                      "comment"}),
     *                  @OA\Property(property="type_sort", type="string", enum={"ASC", "DESC"}),
     *              ),
     *          )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object",
     *                  required={"current_page", "data", "first_page_url", "from", "last_page",
     *                  "last_page_url", "next_page_url", "path", "per_page", "prev_page_url",
     *                  "to", "total"},
     *                  @OA\Property(property="current_page", type="integer", example=1),
     *                  @OA\Property(property="data", type="array",
     *                      @OA\Items(type="string", ref="#/components/schemas/Contact")
     *                  ),
     *                  @OA\Property(
     *                      property="first_page_url",
     *                      type="string",
     *                      example="http://localhost/api/contacts?page=1"
     *                  ),
     *                  @OA\Property(property="from", type="integer", example=1),
     *                  @OA\Property(property="last_page", type="integer", example=512),
     *                  @OA\Property(
     *                      property="last_page_url",
     *                      type="string",
     *                      example="http://localhost/api/contacts?page=512"
     *                  ),
     *                  @OA\Property(
     *                      property="next_page_url",
     *                      type="string",
     *                      example="http://localhost/api/contacts?page=2"
     *                  ),
     *                  @OA\Property(
     *                      property="path",
     *                      type="string",
     *                      example="http://localhost/api/contacts"
     *                  ),
     *                  @OA\Property(property="per_page", type="integer", example=50),
     *                  @OA\Property(property="prev_page_url", example="null"),
     *                  @OA\Property(property="to", type="integer", example=50),
     *                  @OA\Property(property="total", type="integer", example=25566),
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
            $request->get('sort', []),
            $request->get('page', GetContactListCommand::DEFAULT_PAGE),
            $request->get('limit', GetContactListCommand::DEFAULT_LIMIT)
        );

        $contacts = $this->contactService->getContactListBySearchParams($command);

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
     *                 @OA\Property(property="payload", type="object",
     *                     required={"count", "expected"},
     *                     @OA\Property(property="count", type="int", example="10"),
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
