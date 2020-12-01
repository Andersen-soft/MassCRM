<?php declare(strict_types=1);

namespace App\Services\Ldap;

class LdapService
{
    private const LDAP_PARAM_NAME = 'givenname';
    private const LDAP_PARAM_SURNAME = 'sn';
    private const LDAP_PARAM_LOGIN = 'samaccountname';
    private const LDAP_PARAM_MAIL = 'mail';
    private const LDAP_PARAM_SEARCH = [
        self::LDAP_PARAM_NAME, self::LDAP_PARAM_SURNAME, self::LDAP_PARAM_LOGIN, self::LDAP_PARAM_MAIL
    ];

    /**
     * @return resource
     */
    private function ldapConnect()
    {
        $ldapConnect = ldap_connect(config('ldap.host'), config('ldap.port'));

        ldap_set_option($ldapConnect, LDAP_OPT_REFERRALS, 0);
        ldap_set_option($ldapConnect, LDAP_OPT_PROTOCOL_VERSION, 3);

        ldap_bind($ldapConnect, config('ldap.username'), config('ldap.password'));

        return $ldapConnect;
    }

    public function fetchListUser(string $email): array
    {
        $ldapConnect = $this->ldapConnect();

        $users = $this->searchUsers($ldapConnect, $email);
        if (empty($users) && empty($users['count'])) {
            return [];
        }

        $ldapUsers = [];

        for ($i = 0; $i < $users['count']; $i++) {
            if (empty($users[$i][self::LDAP_PARAM_MAIL][0]) ||
                empty($users[$i][self::LDAP_PARAM_NAME][0]) ||
                empty($users[$i][self::LDAP_PARAM_SURNAME][0]) ||
                empty($users[$i][self::LDAP_PARAM_LOGIN][0])
            ) {
                continue;
            }
            $ldapUsers[] = [
                'email' => $users[$i][self::LDAP_PARAM_MAIL][0],
                'name' => $users[$i][self::LDAP_PARAM_NAME][0],
                'surname' => $users[$i][self::LDAP_PARAM_SURNAME][0],
                'login' => $users[$i][self::LDAP_PARAM_LOGIN][0]
            ];
        }

        return $ldapUsers;
    }

    /**
     * @param resource $ldapConnect
     * @param string $email
     * @return array
     */
    private function searchUsers($ldapConnect, string $email): array
    {
        $users = ldap_search(
            $ldapConnect,
            config('ldap.base_dn'),
            sprintf(config('ldap.filter'), $email),
            self::LDAP_PARAM_SEARCH
        );

        return ldap_get_entries($ldapConnect, $users);
    }
}
