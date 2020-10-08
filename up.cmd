copy masscrm_back\.env.local masscrm_back\.env
copy masscrm_front\.env.local masscrm_front\.env
docker-compose -f docker-compose-win.yaml up --build --remove-orphans -d db-pg
REM docker exec db-pg chown -R postgres:postgres /var/lib/postgresql
docker-compose -f docker-compose-win.yaml up --build --remove-orphans --force-recreate -d
REM #execute command in container after build cause of network inactivity before run
docker exec -it back-php-fpm74 sh -c "php artisan config:cache && echo yes | php artisan migrate && php artisan cache:clear && php artisan view:clear && php artisan route:clear"
docker exec -it db-pg  sh -c "echo 'CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;' | psql -U masscrm"
