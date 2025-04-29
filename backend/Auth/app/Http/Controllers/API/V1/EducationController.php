<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EducationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'year' => 'required|string|max:4',
        ]);

        Auth::user()->education()->create($validated);

        return back()->with('success', 'Formation ajoutée avec succès');
    }

    public function destroy(Education $education)
    {
        $this->authorize('delete', $education);

        $education->delete();

        return back()->with('success', 'Formation supprimée avec succès');
    }
}
