#!/bin/bash
/usr/local/bin/php /var/www/artisan transferCompany:command &
echo "At `date` /usr/local/bin/php /var/www/artisan transferCompany:command was executed!" >> /var/log/docker/cron.log