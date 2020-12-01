<?php declare(strict_types=1);

namespace App\Socket;

use Illuminate\Support\Facades\Log;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use SplObjectStorage;
use App\Models\User\User;
use App\Services\Token\TymonTokenManager;

class WebSocket implements MessageComponentInterface
{
    private SplObjectStorage $clients;
    private TymonTokenManager $tymonTokenManager;

    public function __construct(TymonTokenManager $tymonTokenManager)
    {
        $this->clients = new SplObjectStorage;
        $this->tymonTokenManager = $tymonTokenManager;
    }

    public function onOpen(ConnectionInterface $conn): void
    {
        $output = [];
        parse_str($conn->httpRequest->getUri()->getQuery(), $output);
        if ($client = $this->getUserFromToken($output)) {
            $conn->user = $client;
            $this->clients->attach($conn);
            echo "New connection ({$conn->resourceId})" . PHP_EOL;
        } else {
            $conn->close();
        }
    }

    public function onMessage(ConnectionInterface $from, $msg): void
    {
        $data = json_decode($msg, true);
        if ($data && isset($data['recipient'])) {
            $this->sendMessageRecipient($data['recipient'], json_encode($data['info'], JSON_UNESCAPED_UNICODE));
        } else {
            $this->sendMessageAll(json_encode($data['info'], JSON_UNESCAPED_UNICODE));
        }
    }

    public function onClose(ConnectionInterface $conn): void
    {
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected". PHP_EOL;
    }

    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        Log::error("An error has occurred: {$e->getMessage()}");

        $conn->close();
    }

    private function getUserFromToken(array $data): ?User
    {
        if (empty($data['token'])) {
            return null;
        }

        $dataUser = $this->tymonTokenManager->decode($data['token']);
        if (!empty($dataUser['sub'])) {
            return User::query()->find($dataUser['sub']);
        }

        return null;
    }

    private function sendMessageRecipient(int $recipient, string $data): void
    {
        foreach ($this->clients as $client) {
            if (isset($client->user) && $client->user->id === $recipient) {
                $client->send($data);
            }
        }
    }

    private function sendMessageAll(string $msg): void
    {
        foreach ($this->clients as $client) {
            $client->send($msg);
        }
    }
}
