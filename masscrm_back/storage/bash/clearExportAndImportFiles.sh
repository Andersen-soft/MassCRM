/usr/local/bin/php /var/www/artisan deleteOldExports && /usr/local/bin/php /var/www/artisan deleteOldImports &
echo "At `date` /usr/local/bin/php /var/www/artisan deleteOldExports && deleteOldImports was executed!" >> /var/log/docker/cron.log
