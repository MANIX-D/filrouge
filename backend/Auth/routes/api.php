<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\ProfileController;
use App\Http\Controllers\API\V1\SkillController;
use App\Http\Controllers\API\V1\LanguageController;
use App\Http\Controllers\API\V1\EducationController;
use App\Http\Controllers\API\V1\CertificationController;
use App\Http\Controllers\API\V1\PortfolioProjectController;
use App\Http\Controllers\API\V1\AuthController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show.user');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/toggle-availability', [ProfileController::class, 'toggleAvailability'])->name('profile.toggle-availability');

    // Skills routes
    Route::post('/skills', [SkillController::class, 'store'])->name('skills.store');
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy'])->name('skills.destroy');

    // Languages routes
    Route::post('/languages', [LanguageController::class, 'store'])->name('languages.store');
    Route::delete('/languages/{language}', [LanguageController::class, 'destroy'])->name('languages.destroy');

    // Education routes
    Route::post('/education', [EducationController::class, 'store'])->name('education.store');
    Route::delete('/education/{education}', [EducationController::class, 'destroy'])->name('education.destroy');

    // Certifications routes
    Route::post('/certifications', [CertificationController::class, 'store'])->name('certifications.store');
    Route::delete('/certifications/{certification}', [CertificationController::class, 'destroy'])->name('certifications.destroy');

    // Portfolio projects routes
    Route::post('/portfolio-projects', [PortfolioProjectController::class, 'store'])->name('portfolio-projects.store');
    Route::delete('/portfolio-projects/{portfolioProject}', [PortfolioProjectController::class, 'destroy'])->name('portfolio-projects.destroy');

    Route::get('/user', function (Request $request) {
        return $request->user()->load([
            'skills',
            'languages',
            'education',
            'certifications',
            'portfolioProjects.technologies'
        ]);
    });

    Route::post('/profile/toggle-availability', [ProfileController::class, 'toggleAvailability']);
});

Route::get('/profile/{id}', function ($id) {
    $user = \App\Models\User::with([
        'skills',
        'languages',
        'education',
        'certifications',
        'portfolioProjects.technologies'
    ])->findOrFail($id);

    return response()->json([
        'user' => $user,
        'isCurrentUser' => auth()->id() === $user->id,
    ]);
});
