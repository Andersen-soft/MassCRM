#!/bin/bash
/usr/local/bin/php /var/www/artisan queue:work --queue=default --timeout=10
