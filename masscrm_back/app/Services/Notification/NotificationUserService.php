<?php declare(strict_types=1);

namespace App\Services\Notification;

use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Repositories\User\UserRepository;
use App\Services\User\UserService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Mail\User\MailRegistrationUserActiveDirectory;
use App\Mail\User\MailRegistrationUserEmail;
use App\Mail\User\MailChangePasswordUser;
use App\Mail\User\MailChangeLoginUser;

use App\Services\Token\FirebaseTokenManager;
use Illuminate\Support\Facades\Mail;
use WebSocket\BadOpcodeException;
use WebSocket\Client;
use WebSocket\ConnectionException;

class NotificationUserService
{
    private UserService $userService;
    private UserRepository $userRepository;
    private FirebaseTokenManager $firebaseTokenManager;
    private array $clientSocketConfig;

    public function __construct(
        UserService $userService,
        UserRepository $userRepository,
        FirebaseTokenManager $firebaseTokenManager
    ) {
        $this->userService = $userService;
        $this->userRepository = $userRepository;
        $this->firebaseTokenManager = $firebaseTokenManager;
        $this->clientSocketConfig = [
            'timeout' => 60,
            'logger' => logger()
        ];
    }

    public function sendNotificationRegistrationUserActiveDirectory(User $user): void
    {
        Mail::to($user->getEmail())->send(new MailRegistrationUserActiveDirectory($user));
    }

    public function sendNotificationRegistrationUserEmail(User $user): void
    {
        $token = $this->firebaseTokenManager->encode($user);
        Mail::to($user->getEmail())->send(new MailRegistrationUserEmail($token, $user));
    }

    public function sendLinkChangePasswordUser(User $user): void
    {
        $token = $this->firebaseTokenManager->encode($user);
        Mail::to($user->getEmail())->send(new MailChangePasswordUser($token, $user));
    }

    public function sendNewLoginUser(User $user): void
    {
        Mail::to($user->getEmail())->send(new MailChangeLoginUser($user));
    }

    public function sendNotificationUserToSocket(
        string $typeNotification,
        string $message,
        array $users,
        ?string $filePath,
        ?int $operationId
    ): void {
        $token = $this->userService->loginUserSuperAdmin();
        $client = new Client(config('socket.host') . '?token=' . $token, $this->clientSocketConfig);
        if (empty($users)) {
            $users = $this->userRepository->getListActiveUser();
        }

        /** @var User $user */
        foreach ($users as $user) {
            $data = [
                'recipient' => $user->id,
                'info' => [
                    'type' => $typeNotification,
                    'data' => [
                        'created_at' => Carbon::now(),
                        'message' => $message,
                        'operation_id' => $operationId,
                        'file_path' => $filePath
                    ]
                ]
            ];
            if ($token) {
                $this->sendNotificationToSocket($data, $client);
            }

            $this->sendNotificationToDB($user, $data);
        }

        $client->close();
    }

    public function sendNotificationUserToSocketWithoutSavingInDatabase(
        string $typeNotification,
        string $message
    ): void {
        $token = $this->userService->loginUserSuperAdmin();
        $client = new Client(config('socket.host') . '?token=' . $token, $this->clientSocketConfig);
        $data = [
            'info' => [
                'type' => $typeNotification,
                'data' => [
                    'created_at' => Carbon::now(),
                    'message' => $message,
                ]
            ]
        ];
        logger('Socket notification User to socket without saving in DB: ' . json_encode($data));
        if ($token) {
            $this->sendNotificationToSocket($data, $client);
        }

        $client->close();
    }

    private function sendNotificationToSocket(array $data, Client $client): void
    {
        try {
            $client->send(json_encode($data));
        } catch (BadOpcodeException | ConnectionException $e) {
            Log::error('Cant send message. Error: ' . $e->getMessage());
        }
    }

    private function sendNotificationToDB(User $user, array $data): void
    {
        $notification = new UsersNotification();
        $notification->type_notification = $data['info']['type'];
        $notification->message = $data['info']['data']['message'];
        $notification->operation_id = $data['info']['data']['operation_id'];
        $notification->file_path = $data['info']['data']['file_path'];

        $user->notifications()->save($notification);
    }

    public function sendNotificationImportProgressBarToSocket(int $percent, int $importId, $token): void
    {
        $client = new Client(config('socket.host') . '?token=' . $token, $this->clientSocketConfig);
        $data = [
            'info' => [
                'type' => 'import_progress_bar',
                'data' => [
                    'id' => $importId,
                    'created_at' => Carbon::now(),
                    'percent' => $percent,
                ]
            ]
        ];
        logger('Socket data import progress bar to socket: ' . json_encode($data));
        $this->sendNotificationToSocket($data, $client);

        $client->close();
    }

    public function sendNotificationExportProgressBarToSocket(int $percent, int $exportId, $token): void
    {
        $client = new Client(config('socket.host') . '?token=' . $token, $this->clientSocketConfig);
        $data = [
            'info' => [
                'type' => 'export_progress_bar',
                'data' => [
                    'id' => $exportId,
                    'created_at' => Carbon::now(),
                    'percent' => $percent,
                ]
            ]
        ];
        logger('Socket data export progress bar to socket: ' . json_encode($data));
        $this->sendNotificationToSocket($data, $client);

        $client->close();
    }
}
