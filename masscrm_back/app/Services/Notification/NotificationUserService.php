<?php

namespace App\Services\Notification;

use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Repositories\User\UserRepository;
use App\Services\User\UserService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Mail\User\{
    MailRegistrationUserActiveDirectory,
    MailRegistrationUserEmail,
    MailChangePasswordUser,
    MailChangeLoginUser
};

use App\Services\Token\FirebaseTokenManager;
use Illuminate\Support\Facades\Mail;
use WebSocket\BadOpcodeException;
use WebSocket\Client;

class NotificationUserService
{
    private UserService $userService;
    private UserRepository $userRepository;
    private FirebaseTokenManager $firebaseTokenManager;

    public function __construct(
        UserService $userService,
        UserRepository $userRepository,
        FirebaseTokenManager $firebaseTokenManager
    ) {
        $this->userService = $userService;
        $this->userRepository = $userRepository;
        $this->firebaseTokenManager = $firebaseTokenManager;
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
        $client = new Client(config('socket.host') . '?token=' . $token);
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

    private function sendNotificationToSocket(array $data, Client $client): void
    {
        try {
            $client->send(json_encode($data));
        } catch (BadOpcodeException $e) {
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
}
