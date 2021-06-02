<?php declare(strict_types=1);

namespace App\Commands\Import;

use App\Models\User\User;

/**
 * Class ImportStartParseCommand
 * @package  App\Commands\Filter
 */
class ImportStartParseCommand
{
    public const DUPLICATION_ACTION_REPLACE = 'replace';
    public const DUPLICATION_ACTION_MERGE = 'merge';
    public const DUPLICATION_ACTION_SKIP = 'skip';
    public const DUPLICATION_ACTIONS = [
        self::DUPLICATION_ACTION_MERGE, self::DUPLICATION_ACTION_REPLACE, self::DUPLICATION_ACTION_SKIP
    ];

    protected User $user;
    protected string $fileName;
    protected array $fields;
    protected array $origin;
    protected int $responsible;
    protected bool $isHeader;
    protected string $duplicationAction;
    protected string $columnSeparator;
    protected ?string $comment;
    protected string $token;

    public function __construct(
        User $user,
        string $fileName,
        array $fields,
        array $origin,
        int $responsible,
        bool $isHeader,
        string $duplicationAction,
        string $columnSeparator,
        string $token,
        string $comment = null
    ) {
        $this->user = $user;
        $this->fileName = $fileName;
        $this->fields = $fields;
        $this->origin = $origin;
        $this->responsible = $responsible;
        $this->isHeader = in_array($isHeader, ['1', 'true'], false);
        $this->duplicationAction = $duplicationAction;
        $this->columnSeparator = $columnSeparator;
        $this->token = $token;
        $this->comment = $comment;
    }

    public function getFields(): array
    {
        return $this->fields;
    }

    public function getOrigin(): array
    {
        return $this->origin;
    }

    public function getResponsible(): int
    {
        return $this->responsible;
    }

    public function getDuplicationAction(): string
    {
        return $this->duplicationAction;
    }

    public function getColumnSeparator(): string
    {
        return $this->columnSeparator;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function isHeader(): bool
    {
        return $this->isHeader;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getFileName(): string
    {
        return $this->fileName;
    }
}
