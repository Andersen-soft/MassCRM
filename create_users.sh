#!/bin/sh
docker exec -it back-php-fpm74  sh -c 'php artisan db:seed --class=UsersSeeder'