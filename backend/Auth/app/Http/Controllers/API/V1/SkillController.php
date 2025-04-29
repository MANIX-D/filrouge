<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SkillController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|in:Débutant,Intermédiaire,Avancé,Expert',
        ]);

        Auth::user()->skills()->create($validated);

        return back()->with('success', 'Compétence ajoutée avec succès');
    }

    public function destroy(Skill $skill)
    {
        $this->authorize('delete', $skill);

        $skill->delete();

        return back()->with('success', 'Compétence supprimée avec succès');
    }
}
