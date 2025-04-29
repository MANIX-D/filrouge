<?php

namespace App\Policies;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SkillPolicy
{
    use HandlesAuthorization;

    public function delete(User $user, Skill $skill)
    {
        return $user->id === $skill->user_id;
    }
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
}
