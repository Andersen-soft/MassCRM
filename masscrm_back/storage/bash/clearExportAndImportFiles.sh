/usr/local/bin/php /var/www/artisan deleteOldProcesses export_contacts export_blacklist \
 && /usr/local/bin/php /var/www/artisan deleteOldProcesses import_contacts --days=0 \
 && /usr/local/bin/php /var/www/artisan deleteOldImports \
 & echo "At `date` /usr/local/bin/php /var/www/artisan deleteOldExports && deleteOldImports was executed!" >> /var/log/docker/cron.log
