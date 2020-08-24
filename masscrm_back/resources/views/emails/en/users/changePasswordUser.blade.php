@component('mail::message')
Good afternoon, {{ $fullName }}

Your <a href="{{ $urlWebSite  }}" target="_blank">MassCRM</a> password has been reset.
To set new password follow the link <a href="{{ $urlSetPassword  }}" target="_blank">{{ $urlWebSite  }}</a>

@endcomponent
