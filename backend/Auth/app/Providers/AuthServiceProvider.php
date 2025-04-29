<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Skill;
use App\Models\Language;
use App\Models\Education;
use App\Models\Certification;
use App\Models\PortfolioProject;
use App\Policies\SkillPolicy;
use App\Policies\LanguagePolicy;
use App\Policies\EducationPolicy;
use App\Policies\CertificationPolicy;
use App\Policies\PortfolioProjectPolicy;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Skill::class => SkillPolicy::class,
        Language::class => LanguagePolicy::class,
        Education::class => EducationPolicy::class,
        Certification::class => CertificationPolicy::class,
        PortfolioProject::class => PortfolioProjectPolicy::class,
    ];
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
