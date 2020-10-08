#!/bin/bash
/usr/local/bin/php /var/www/artisan queue:work --queue=export_contact_list --timeout=10
