#!/bin/bash
/usr/local/bin/php /var/www/artisan queue:work --queue=import_contact --timeout=10
