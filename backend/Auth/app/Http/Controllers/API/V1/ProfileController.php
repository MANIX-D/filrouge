<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Skill;
use App\Models\Language;
use App\Models\Education;
use App\Models\Certification;
use App\Models\PortfolioProject;
use App\Models\ProjectTechnology;
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

        $profile = [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'title' => $user->title,
            'location' => $user->location,
            'daily_rate' => $user->daily_rate,
            'about' => $user->about,
            'is_available' => $user->is_available,
            'skills' => $user->skills,
            'languages' => $user->languages,
            'education' => $user->education,
            'certifications' => $user->certifications,
            'portfolioProjects' => $user->portfolioProjects
        ];

        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'daily_rate' => 'required|numeric',
            'about' => 'required|string',
            'skills' => 'required|string',
            'languages' => 'required|string',
            'education' => 'required|string',
            'certifications' => 'required|string',
            'portfolioProjects' => 'required|string'
        ]);

        // Mettre à jour les informations de base
        $user->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'title' => $validated['title'],
            'location' => $validated['location'],
            'daily_rate' => $validated['daily_rate'],
            'about' => $validated['about']
        ]);

        try {
            // Skills
            $user->skills()->delete();
            $skills = json_decode($validated['skills'], true);
            foreach ($skills as $skill) {
                $user->skills()->create(['name' => $skill]);
            }

            // Languages
            $user->languages()->delete();
            $languages = json_decode($validated['languages'], true);
            foreach ($languages as $language) {
                $user->languages()->create([
                    'name' => $language['name'],
                    'level' => $language['level']
                ]);
            }

            // Education
            $user->education()->delete();
            $education = json_decode($validated['education'], true);
            foreach ($education as $edu) {
                $user->education()->create([
                    'diploma' => $edu['diploma'],
                    'school' => $edu['school'],
                    'year' => $edu['year'],
                    'description' => $edu['description']
                ]);
            }

            // Certifications
            $user->certifications()->delete();
            $certifications = json_decode($validated['certifications'], true);
            foreach ($certifications as $cert) {
                $user->certifications()->create([
                    'name' => $cert['name'],
                    'organization' => $cert['organization'],
                    'year' => $cert['year'],
                    'url' => $cert['url']
                ]);
            }

            // Portfolio Projects
            $user->portfolioProjects()->delete();
            $projects = json_decode($validated['portfolioProjects'], true);
            foreach ($projects as $project) {
                $portfolioProject = $user->portfolioProjects()->create([
                    'user_id' => $user->id,
                    'title' => $project['title'],
                    'description' => $project['description'],
                    'url' => $project['url']
                ]);
                
                if (isset($project['technologies'])) {
                    foreach ($project['technologies'] as $tech) {
                        $portfolioProject->technologies()->create([
                            'name' => $tech
                        ]);
                    }
                }
            }

            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user->load(['skills', 'languages', 'education', 'certifications', 'portfolioProjects.technologies'])
            ]);

        } catch (\Exception $e) {
            \Log::error('Error updating profile: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleAvailability()
    {
        $user = Auth::user();
        $user->is_available = !$user->is_available;
        $user->save();

        return response()->json(['is_available' => $user->is_available]);
    }
}
