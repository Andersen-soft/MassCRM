@component('mail::message')
Good afternoon, {{ $fullName }}

Your <a href="{{ $urlWebSite  }}" target="_blank">MassCRM</a> login has been changed.
To log in system use the new login below.

Login: <b>{{ $login }}</b>

@endcomponent
