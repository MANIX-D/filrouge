<?php

namespace App\Policies;

use App\Models\Language;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LanguagePolicy
{
    use HandlesAuthorization;

    public function delete(User $user, Language $language)
    {
        return $user->id === $language->user_id;
    }
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
}
