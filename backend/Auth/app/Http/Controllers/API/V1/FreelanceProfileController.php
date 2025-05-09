<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Skill;
use App\Models\Language;
use App\Models\Education;
use App\Models\Certification;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

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

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            
            $user = Auth::user();

            // Validation des données
            $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'title' => 'required|string|max:255',
                'location' => 'nullable|string|max:255',
                'daily_rate' => 'nullable|string',
                'about' => 'nullable|string',
                'skills' => 'nullable|string',
                'languages' => 'nullable|string',
                'education' => 'nullable|string',
                'certifications' => 'nullable|string',
                'portfolioProjects' => 'nullable|string'
            ]);

            Log::info('Données validées:', $validated);

            // Mise à jour des informations de l'utilisateur
            $user->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'professional_title' => $validated['title'],
                'bio' => $validated['about'],
                'location' => $validated['location'],
                'daily_rate' => $validated['daily_rate'],
                'user_type' => 'freelance'
            ]);

            // Traitement des compétences
            if (isset($validated['skills'])) {
                $skills = json_decode($validated['skills'], true) ?? [];
                $user->skills()->delete();
                foreach ($skills as $skillName) {
                    if (!empty($skillName)) {
                        $user->skills()->create(['name' => $skillName]);
                    }
                }
            }

            // Traitement des langues
            if (isset($validated['languages'])) {
                $languages = json_decode($validated['languages'], true) ?? [];
                $user->languages()->delete();
                foreach ($languages as $language) {
                    if (!empty($language['name'])) {
                        $user->languages()->create([
                            'name' => $language['name'],
                            'level' => $language['level']
                        ]);
                    }
                }
            }

            // Traitement des formations
            if (isset($validated['education'])) {
                $education = json_decode($validated['education'], true) ?? [];
                $user->education()->delete();
                foreach ($education as $edu) {
                    if (!empty($edu['diploma']) || !empty($edu['school'])) {
                        $user->education()->create([
                            'diploma' => $edu['diploma'],
                            'school' => $edu['school'],
                            'year' => $edu['year'],
                            'description' => $edu['description'] ?? null
                        ]);
                    }
                }
            }

            // Traitement des certifications
            if (isset($validated['certifications'])) {
                $certifications = json_decode($validated['certifications'], true) ?? [];
                $user->certifications()->delete();
                foreach ($certifications as $cert) {
                    if (!empty($cert['name'])) {
                        $user->certifications()->create([
                            'name' => $cert['name'],
                            'organization' => $cert['organization'],
                            'year' => $cert['year'],
                            'url' => $cert['url'] ?? null
                        ]);
                    }
                }
            }

            // Traitement des projets portfolio
            if (isset($validated['portfolioProjects'])) {
                $portfolioProjects = json_decode($validated['portfolioProjects'], true) ?? [];
                $user->portfolioProjects()->delete();
                foreach ($portfolioProjects as $project) {
                    if (!empty($project['url'])) {
                        $portfolioProject = $user->portfolioProjects()->create([
                            'title' => $project['title'] ?? '',
                            'description' => $project['description'] ?? '',
                            'url' => $project['url']
                        ]);
                    }
                }
            }

            DB::commit();

            // Charger les relations pour la réponse
            $user->load(['skills', 'languages', 'education', 'certifications', 'portfolioProjects']);

            return response()->json([
                'message' => 'Profil mis à jour avec succès',
                'user' => $user
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de la création du profil freelance: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'message' => 'Erreur lors de la création du profil',
                'error' => $e->getMessage()
            ], 500);
        }
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
