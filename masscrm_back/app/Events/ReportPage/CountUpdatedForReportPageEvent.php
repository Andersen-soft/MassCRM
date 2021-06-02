<?php declare(strict_types=1);

namespace App\Events\ReportPage;

use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\User\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CountUpdatedForReportPageEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Contact $contact;

    public Company $company;

    public array $data;

    public User $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(
        Contact $contact,
        Company $company,
        array $data,
        User $user
    )
    {
        $this->contact = $contact;
        $this->company = $company;
        $this->data = $data;
        $this->user = $user;
    }
}
