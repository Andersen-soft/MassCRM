<?php declare(strict_types=1);

return [
    'host' => env('SOCKET_HOST', 'ws://localhost:' . env('SOCKET_PORT', '8090')),
    'port' => env('SOCKET_PORT', '8090'),
];
