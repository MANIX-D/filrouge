<?php

namespace App\Policies;

use App\Models\PortfolioProject;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PortfolioProjectPolicy
{
    use HandlesAuthorization;

    public function delete(User $user, PortfolioProject $portfolioProject)
    {
        return $user->id === $portfolioProject->user_id;
    }
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
}
