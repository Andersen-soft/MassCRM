<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Socket\WebSocket;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Illuminate\Console\Command;
use App\Services\Token\TymonTokenManager;

class WebSocketServer extends Command
{
    private TymonTokenManager $tymonTokenManager;

    public function __construct(TymonTokenManager $tymonTokenManager)
    {
        parent::__construct();
        $this->tymonTokenManager = $tymonTokenManager;
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'websocket:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initializing WebSocket server to receive and manage connections';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        $this->info('Start socket!');
        $server = IoServer::factory(
            new HttpServer(
                new WsServer(
                    new WebSocket($this->tymonTokenManager)
                )
            ),
            config('socket.port')
        );
        $server->run();
    }
}
