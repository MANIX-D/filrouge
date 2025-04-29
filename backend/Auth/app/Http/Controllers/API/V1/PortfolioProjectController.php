<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PortfolioProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'technologies' => 'required|array',
            'technologies.*' => 'required|string|max:255',
        ]);

        $project = new PortfolioProject([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('portfolio', 'public');
            $project->image = $path;
        }

        Auth::user()->portfolioProjects()->save($project);

        foreach ($validated['technologies'] as $tech) {
            $project->technologies()->create(['name' => $tech]);
        }

        return back()->with('success', 'Projet ajouté avec succès');
    }

    public function destroy(PortfolioProject $portfolioProject)
    {
        $this->authorize('delete', $portfolioProject);

        if ($portfolioProject->image) {
            Storage::disk('public')->delete($portfolioProject->image);
        }

        $portfolioProject->delete();

        return back()->with('success', 'Projet supprimé avec succès');
    }
}
