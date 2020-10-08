REM #Generate application key
echo Generate application key && docker exec -it back-php-fpm74 php artisan key:generate
REM #Generate JWT secret key
echo Generate JWT secret key && docker exec -it back-php-fpm74 php artisan jwt:secret
REM #Create  list users 
echo "Create  users' list" && docker exec -it back-php-fpm74 php artisan db:seed --class=OpenSourceUsersSeeder 
REM #Create permission for users
echo Create permission for users && docker exec -it back-php-fpm74 php artisan db:seed --class=PermissionsSeeder
REM #Load list countries, regions, cities
echo Load list of countries, regions, cities && docker exec -it back-php-fpm74 php artisan db:seed --class=LocationSeeder
REM #Load list Industries
echo Load list of Industries && docker exec -it back-php-fpm74 php artisan db:seed --class=IndustriesSeeder
REM #Load contacts, companies
echo Load list of initial demo contacts, companies from csv file && docker exec -it back-php-fpm74 php artisan parse:files
REM #Clear cache
echo Clear cache && docker exec -it back-php-fpm74 php artisan config:cache