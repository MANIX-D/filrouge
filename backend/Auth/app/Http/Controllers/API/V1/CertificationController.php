<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CertificationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'year' => 'required|string|max:4',
        ]);

        Auth::user()->certifications()->create($validated);

        return back()->with('success', 'Certification ajoutée avec succès');
    }

    public function destroy(Certification $certification)
    {
        $this->authorize('delete', $certification);

        $certification->delete();

        return back()->with('success', 'Certification supprimée avec succès');
    }
}
