<?php declare(strict_types=1);

namespace App\Mail\User;

use App\Models\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Lang;

class MailChangeLoginUser extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    private string $urlWebSite;
    private User $user;

    public function __construct(User $user)
    {
        $this->urlWebSite = config('app.front_end_url');
        $this->user = $user;
    }

    public function build(): MailChangeLoginUser
    {
        return $this->subject(Lang::get('mail.login_user'))
            ->markdown('emails.' . app()->getLocale() . '.users.changeLoginUser')
            ->with([
                'login' => $this->user->getLogin(),
                'urlWebSite' => $this->urlWebSite,
                'fullName' => $this->user->getFullNameAttribute()
            ]);
    }
}
