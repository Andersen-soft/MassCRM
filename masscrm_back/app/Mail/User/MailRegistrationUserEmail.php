<?php

namespace App\Mail\User;

use App\Models\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Lang;

class MailRegistrationUserEmail extends Mailable implements ShouldQueue
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

    public function build(): MailRegistrationUserEmail
    {
        return $this->subject(Lang::get('mail.registration_user'))
            ->markdown('emails.' . app()->getLocale() . '.users.registration.registrationUserEmail')
            ->with([
                'urlSetPassword' => $this->urlSetPassword,
                'urlWebSite' => $this->urlWebSite,
                'fullName' => $this->user->getFullNameAttribute()
            ]);
    }
}
