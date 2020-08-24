<?php

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
    protected array $fields;
    protected array $origin;
    protected int $responsible;
    protected bool $isHeader;
    protected string $duplicationAction;
    protected ?string $columnSeparator;
    protected ?string $comment;

    public function __construct(
        User $user,
        array $fields,
        array $origin,
        string $responsible,
        string $isHeader,
        string $duplicationAction,
        string $columnSeparator = null,
        string $comment = null
    )
    {
        $this->user = $user;
        $this->fields = $fields;
        $this->origin = $origin;
        $this->responsible = (int)$responsible;
        $this->isHeader = in_array($isHeader, ['1', 'true']);
        $this->duplicationAction = $duplicationAction;
        $this->columnSeparator = $columnSeparator;
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

    public function getColumnSeparator(): ?string
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

    public function isReplaceAction(): bool
    {
        return $this->isReplaceAction() === self::DUPLICATION_ACTION_REPLACE;
    }

    public function isMergeAction(): bool
    {
        return $this->isReplaceAction() === self::DUPLICATION_ACTION_MERGE;
    }

    public function isSkipAction(): bool
    {
        return $this->isReplaceAction() === self::DUPLICATION_ACTION_SKIP;
    }
}
