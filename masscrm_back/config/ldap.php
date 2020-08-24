<?php

return [

    /*
    |--------------------------------------------------------------------------
    | LDAP Username & Password
    |--------------------------------------------------------------------------
    |
    | When connecting to your LDAP server, a username and password is required
    | to be able to query and run operations on your server(s). You can
    | use any user account that has these permissions. This account
    | does not need to be a domain administrator unless you
    | require changing and resetting user passwords.
    |
    */

    'username' => env('LDAP_USERNAME', 'username'),
    'password' => env('LDAP_PASSWORD', 'secret'),

    /*
    |--------------------------------------------------------------------------
    | Domain Controllers
    |--------------------------------------------------------------------------
    |
    | The domain controllers option is an array of servers located on your
    | network that serve Active Directory. You can insert as many servers or
    | as little as you'd like depending on your forest (with the
    | minimum of one of course).
    |
    | These can be IP addresses of your server(s), or the host name.
    |
    */

    'host' => env('LDAP_HOST', '195.168.0.1'),

    /*
    |--------------------------------------------------------------------------
    | Port
    |--------------------------------------------------------------------------
    |
    | The port option is used for authenticating and binding to your LDAP server.
    |
    */

    'port' => env('LDAP_PORT', 389),

    /*
    |--------------------------------------------------------------------------
    | Base Distinguished Name
    |--------------------------------------------------------------------------
    |
    | The base distinguished name is the base distinguished name you'd
    | like to perform query operations on. An example base DN would be:
    |
    |        dc=corp,dc=acme,dc=org
    |
    | A correct base DN is required for any query results to be returned.
    |
    */
    'base_dn' => env('LDAP_BASE_DN', 'dc=corp,dc=acme,dc=org'),

    /*
    |--------------------------------------------------------------------------
    | Filter
    |--------------------------------------------------------------------------
    |
    | The filter for get all user from ldap service
    |
    */

    'filter' => env('LDAP_FILTER', '(&(objectCategory=person)(objectClass=user))'),
];
