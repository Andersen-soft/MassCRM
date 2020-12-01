##MassCRM back-end
The project is written for the business logic of CRM systems. Project users are sales managers and marketing department.

## Technologies
* Laravel 7.0
* PHP version 7.4
* Postgres 10.8
* Redis

## Swagger documentation

https://localhost:8088/api/doc

## Getting started

To start the back-end application please use the following command:

```text
bash up.sh
```

During the execution of this command, the following operations are performed:
1. pull and up docker containers.
2. install dependencies via Composer.
3. migrations execution.
4. start webSocket server.

Creating list of users, contacts, companies and etc.

```text
bash 1stlocalrun.sh
```

## Separate commands

Start websocket server

```text
php artisan websocket:init
OR
bash /var/www/storage/bash/startRatchet.sh
```

Start Redis queue

```text
bash /var/www/storage/bash/startQueue.sh
```

# php cs fixer command 

 - php artisan fixer:fix  --allow-risky=yes
 
# php stan command 

  - ./vendor/bin/phpstan analyse

# phpmd command 

  - vendor/bin/phpmd app text cleancode,codesize,controversial,design,naming,unusedcode
