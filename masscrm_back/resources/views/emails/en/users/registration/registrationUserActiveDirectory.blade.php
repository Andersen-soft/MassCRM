@component('mail::message')
Good afternoon, {{ $fullName }}

You has been registered in <a href="{{ $urlWebSite  }}" target="_blank">MassCRM</a>.
To log in use your corporate login and password <b>Kerio Andersen</b>.

@endcomponent
