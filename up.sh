#!/bin/bash
#cp -v --force ./masscrm_back/.env.local ./masscrm_back/.env
#cp -v --force ./masscrm_front/.env.local ./masscrm_front/.env
docker-compose -f docker-compose.yaml up -d db-pg
docker-compose -f docker-compose.yaml up --build -d
sleep 2
#execute command in container after build cause of network inactivity before run
docker exec -it back-php-fpm74 sh -c 'php artisan config:cache && echo "yes" | php artisan migrate && php artisan cache:clear && php artisan view:clear && php artisan route:clear'
docker exec -it db-pg  sh -c 'echo "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;" | psql -U masscrm'
