#!/bin/bash
#Create  list users 
docker exec -it back-php-fpm74 php artisan db:seed --class=OpenSourceUsersSeeder 
#Create permission for users
docker exec -it back-php-fpm74  php artisan db:seed --class=PermissionsSeeder
#Load list countries, regions, cities
docker exec -it back-php-fpm74  php artisan db:seed --class=LocationSeeder
#Load list Industries
docker exec -it back-php-fpm74  php artisan db:seed --class=IndustriesSeeder
#Load contacts, companies
docker exec -it back-php-fpm74  php artisan parse:files