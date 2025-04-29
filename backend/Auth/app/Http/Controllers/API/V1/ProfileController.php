<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class ProfileController extends Controller
{
    public function show($id = null)
    {
        if ($id) {
            $user = User::with([
                'skills',
                'languages',
                'education',
                'certifications',
                'portfolioProjects.technologies'
            ])->findOrFail($id);
        } else {
            $user = Auth::user()->load([
                'skills',
                'languages',
                'education',
                'certifications',
                'portfolioProjects.technologies'
            ]);
        }

        $isCurrentUser = Auth::id() === $user->id;

        return view('profile.show', compact('user', 'isCurrentUser'));
    }

    public function edit()
    {
        $user = Auth::user()->load([
            'skills',
            'languages',
            'education',
            'certifications',
            'portfolioProjects.technologies'
        ]);

        return view('profile.edit', compact('user'));
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'daily_rate' => 'required|numeric',
            'about' => 'required|string',
        ]);

        $user->update($validated);

        return redirect()->route('profile.show')->with('success', 'Profil mis à jour avec succès');
    }

    public function toggleAvailability()
    {
        $user = Auth::user();
        $user->is_available = !$user->is_available;
        $user->save();

        return response()->json(['is_available' => $user->is_available]);
    }
}
