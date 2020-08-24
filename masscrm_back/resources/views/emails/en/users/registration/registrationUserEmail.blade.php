@component('mail::message')
Good afternoon, {{ $fullName }}

You has been registered in <a href="{{ $urlWebSite  }}" target="_blank">MassCRM</a> system.
To set the password and to log in follow the link
<a href="{{ $urlSetPassword  }}" target="_blank">
    {{ $urlWebSite  }}
</a>

@endcomponent
