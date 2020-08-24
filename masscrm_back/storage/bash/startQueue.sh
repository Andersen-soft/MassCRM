#!/bin/bash

ABSOLUTE_FILENAME=`readlink -e "$0"`
DIRECTORY=`dirname "$ABSOLUTE_FILENAME"`

if ! ps aux | grep [q]ueue:work
then
    php $DIRECTORY/../../artisan queue:work --queue=import_contact,default --timeout=10
fi
