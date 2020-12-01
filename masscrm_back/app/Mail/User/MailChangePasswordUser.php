<?php declare(strict_types=1);

namespace App\Mail\User;

use App\Models\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Lang;

class MailChangePasswordUser extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    private string $urlWebSite;
    private string $urlSetPassword;
    private User $user;

    public function __construct(string $token, User $user)
    {
        $this->urlSetPassword = config('app.front_end_url') . '/set_password?token=' . $token;
        $this->urlWebSite = config('app.front_end_url');
        $this->user = $user;
    }

    public function build(): MailChangePasswordUser
    {
        return $this->subject(Lang::get('mail.change_password'))
            ->markdown('emails.' . app()->getLocale() . '.users.changePasswordUser')
            ->with([
                'urlSetPassword' => $this->urlSetPassword,
                'urlWebSite' => $this->urlWebSite,
                'fullName' => $this->user->getFullNameAttribute()
            ]);
    }
}
