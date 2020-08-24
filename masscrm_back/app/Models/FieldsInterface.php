<?php

namespace App\Models;

interface FieldsInterface
{
    public static function getFieldsToSort(): array;
    public static function getFieldsToSearch(): array;
}
