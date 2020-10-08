#!/bin/bash
/usr/local/bin/php /var/www/artisan lemlistBlacklist:command &
echo "At `date` /usr/local/bin/php /var/www/artisan replyBlacklist:command was executed!" >> /var/log/docker/cron.log