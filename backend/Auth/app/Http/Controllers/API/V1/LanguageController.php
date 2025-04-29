<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LanguageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|in:Débutant,Intermédiaire,Courant,Natif',
        ]);

        Auth::user()->languages()->create($validated);

        return back()->with('success', 'Langue ajoutée avec succès');
    }

    public function destroy(Language $language)
    {
        $this->authorize('delete', $language);

        $language->delete();

        return back()->with('success', 'Langue supprimée avec succès');
    }
}
