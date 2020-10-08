#!/bin/bash
/usr/local/bin/php /var/www/artisan transferContact:command &
echo "At `date` /usr/local/bin/php /var/www/artisan transferContact:command was executed!" >> /var/log/docker/cron.log
