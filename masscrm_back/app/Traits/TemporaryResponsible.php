<?php declare(strict_types=1);

namespace App\Traits;

use App\Models\User\User;

trait TemporaryResponsible
{
    protected ?User $_responsible = null;

    /**
     * @return ?User
     */
    public function getTemporaryResponsible(): ?User
    {
        return $this->_responsible;
    }

    /**
     * @param ?User $_responsible
     */
    public function setTemporaryResponsible(?User $_responsible): void
    {
        $this->_responsible = $_responsible;
    }
}
