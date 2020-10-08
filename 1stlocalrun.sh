#!/bin/bash
#Generate application key
docker exec -it back-php-fpm74 php artisan key:generate
#Generate JWT secret key
docker exec -it back-php-fpm74 php artisan jwt:secret
#Create  list users 
echo Create users && docker exec -it back-php-fpm74 php artisan db:seed --class=OpenSourceUsersSeeder 
#Create permission for users
echo Create permisiions && docker exec -it back-php-fpm74 php artisan db:seed --class=PermissionsSeeder
#Load list countries, regions, cities
echo Load list of countries && docker exec -it back-php-fpm74 php artisan db:seed --class=LocationSeeder
#Load list Industries
echo Load industries && docker exec -it back-php-fpm74 php artisan db:seed --class=IndustriesSeeder
#Load contacts, companies
echo Load contacts && docker exec -it back-php-fpm74 php artisan parse:files
#Clear cache
echo Clear cache && docker exec -it back-php-fpm74 php artisan config:cache
