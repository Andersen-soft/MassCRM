#!/bin/bash

ABSOLUTE_FILENAME=`readlink -e "$0"`
DIRECTORY=`dirname "$ABSOLUTE_FILENAME"`

if ! ps aux | grep [r]un:ratchet
then
    php $DIRECTORY/../../artisan websocket:init
fi
