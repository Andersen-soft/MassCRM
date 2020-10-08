#!/bin/bash
/usr/local/bin/php /var/www/artisan queue:work --queue=export_blacklist --timeout=10
