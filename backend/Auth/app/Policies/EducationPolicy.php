<?php

namespace App\Policies;

use App\Models\Education;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EducationPolicy
{
    use HandlesAuthorization;

    public function delete(User $user, Education $education)
    {
        return $user->id === $education->user_id;
    }
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
}
