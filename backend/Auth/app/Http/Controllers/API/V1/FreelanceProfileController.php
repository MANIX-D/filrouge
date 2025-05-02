<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Skill;
use App\Models\Language;
use App\Models\Education;
use App\Models\Certification;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FreelanceProfileController extends Controller
{
    /**
     * Afficher le formulaire de création de profil freelance.
     */
    public function create()
    {
        $user = Auth::user();

        // Si l'utilisateur a déjà un profil freelance, on récupère ses données
        if ($user->isFreelance()) {
            $skills = $user->skills()->pluck('name')->toArray();
            $languages = $user->languages()->get();
            $education = $user->education()->get();
            $certifications = $user->certifications()->get();
            $portfolioProject = $user->portfolioProject()->pluck('url')->toArray();

            return view('freelance.profile-form', compact(
                'user',
                'skills',
                'languages',
                'education',
                'certifications',
                'portfolioProject'
            ));
        }

        return view('freelance.profile-form', ['user' => $user]);
    }

    /**
     * Stocker les données du profil freelance.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // Validation des données
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'professionalTitle' => 'required|string|max:255',
            'bio' => 'required|string',
            'profilePicture' => 'nullable|image|max:2048',
            'skills' => 'nullable|array',
            'languages' => 'nullable|array',
            'education' => 'nullable|array',
            'certifications' => 'nullable|array',
            'portfolioProject' => 'nullable|array',
        ]);

        // Mise à jour des informations de l'utilisateur
        $user->name = $validated['firstName'] . ' ' . $validated['lastName'];
        $user->professional_title = $validated['professionalTitle'];
        $user->bio = $validated['bio'];
        $user->user_type = 'freelance';

        // Traitement de l'image de profil
        if ($request->hasFile('profilePicture')) {
            // Supprimer l'ancienne image si elle existe
            if ($user->profile_picture) {
                Storage::delete('public/profile_pictures/' . $user->profile_picture);
            }

            // Stocker la nouvelle image
            $imageName = time() . '.' . $request->profilePicture->extension();
            $request->profilePicture->storeAs('public/profile_pictures', $imageName);
            $user->profile_picture = $imageName;
        }

        $user->save();

        // Gestion des compétences
        $user->skills()->delete(); // Supprimer les anciennes compétences
        if (!empty($validated['skills'])) {
            foreach ($validated['skills'] as $skill) {
                $user->skills()->create(['name' => $skill]);
            }
        }

        // Gestion des langues
        $user->languages()->delete(); // Supprimer les anciennes langues
        if (!empty($validated['languages'])) {
            foreach ($validated['languages'] as $language) {
                $user->languages()->create([
                    'name' => $language['name'],
                    'level' => $language['level']
                ]);
            }
        }

        // Gestion des formations
        $user->education()->delete(); // Supprimer les anciennes formations
        if (!empty($validated['education'])) {
            foreach ($validated['education'] as $edu) {
                $user->education()->create([
                    'diploma' => $edu['diploma'],
                    'school' => $edu['school'],
                    'year' => $edu['year'],
                    'description' => $edu['description'] ?? null
                ]);
            }
        }

        // Gestion des certifications
        $user->certifications()->delete(); // Supprimer les anciennes certifications
        if (!empty($validated['certifications'])) {
            foreach ($validated['certifications'] as $cert) {
                $user->certifications()->create([
                    'name' => $cert['name'],
                    'organization' => $cert['organization'],
                    'year' => $cert['year'],
                    'url' => $cert['url'] ?? null
                ]);
            }
        }

        // Gestion des liens portfolio
        $user->portfolioProject()->delete(); // Supprimer les anciens liens
        if (!empty($validated['portfolioProject'])) {
            foreach ($validated['portfolioProject'] as $link) {
                if (!empty($link)) {
                    $user->portfolioProject()->create(['url' => $link]);
                }
            }
        }

        return redirect()->route('freelance.profile.show', $user->id)
            ->with('success', 'Votre profil freelance a été créé avec succès !');
    }

    /**
     * Afficher le profil d'un freelance.
     */
    public function show($id)
    {
        $user = User::with(['skills', 'languages', 'education', 'certifications', 'portfolioProject'])
            ->where('id', $id)
            ->where('user_type', 'freelance')
            ->firstOrFail();

        return view('freelance.profile-show', compact('user'));
    }
}
