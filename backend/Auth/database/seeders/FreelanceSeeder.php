<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Skill;
use App\Models\Language;
use App\Models\Education;
use App\Models\Certification;
use App\Models\PortfolioProject;
use App\Models\ProjectTechnology;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FreelanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        // Créer un utilisateur freelance
        $user = User::create([
            'first_name' => 'Yotto',
            'last_name' => 'Manix',
            'email' => 'manix@example.com',
            'password' => Hash::make('password'),
            'title' => 'Développeuse Full Stack',
            'location' => 'Douala, Cameroun',
            'rating' => 4.9,
            'review_count' => 48,
            'projects_completed' => 21,
            'member_since' => '2025-01-01',
            'daily_rate' => 25000,
            'about' => 'Développeur Full Stack passionné avec plus de 3 ans d\'expérience dans la création architectures cloud. J\'aime relever des défis techniques et créer des solutions innovantes pour mes clients.',
            'is_available' => true,
        ]);

        // Ajouter les compétences
        $skills = [
            ['name' => 'React', 'level' => 'Expert'],
            ['name' => 'Node.js', 'level' => 'Expert'],
            ['name' => 'TypeScript', 'level' => 'Expert'],
            ['name' => 'MongoDB', 'level' => 'Avancé'],
            ['name' => 'AWS', 'level' => 'Avancé'],
            ['name' => 'React Native', 'level' => 'Intermédiaire'],
        ];

        foreach ($skills as $skill) {
            Skill::create([
                'user_id' => $user->id,
                'name' => $skill['name'],
                'level' => $skill['level'],
            ]);
        }

        // Ajouter les langues
        $languages = [
            ['name' => 'Français', 'level' => 'Natif'],
            ['name' => 'Anglais', 'level' => 'Intermédiaire'],
        ];

        foreach ($languages as $language) {
            Language::create([
                'user_id' => $user->id,
                'name' => $language['name'],
                'level' => $language['level'],
            ]);
        }

        // Ajouter l'éducation
        Education::create([
            'user_id' => $user->id,
            'institution' => 'Institut Universitaire de la Côte',
            'degree' => 'licence en Ingénierie Logicielle',
            'year' => '2023',
        ]);

        // Ajouter les certifications
        Certification::create([
            'user_id' => $user->id,
            'name' => 'AWS Certified Solutions Architect',
            'organization' => 'Amazon Web Services',
            'year' => '2023',
        ]);

        // Ajouter les projets du portfolio
        $portfolioProjects = [
            [
                'title' => 'Application E-commerce React',
                'description' => 'Application complète avec panier, paiement et gestion des produits',
                'image' => null,
                'technologies' => ['React', 'Node.js', 'MongoDB'],
            ],
            [
                'title' => 'Dashboard',
                'description' => 'Interface d\'analyse de données en temps réel avec graphiques',
                'image' => null,
                'technologies' => ['React', 'TypeScript', 'D3.js'],
            ],
            [
                'title' => 'Application Mobile Fitness',
                'description' => 'Application de suivi d\'entraînement et de nutrition',
                'image' => null,
                'technologies' => ['React Native', 'Firebase'],
            ],
        ];

        foreach ($portfolioProjects as $projectData) {
            $project = PortfolioProject::create([
                'user_id' => $user->id,
                'title' => $projectData['title'],
                'description' => $projectData['description'],
                'image' => $projectData['image'],
            ]);

            foreach ($projectData['technologies'] as $tech) {
                ProjectTechnology::create([
                    'portfolio_project_id' => $project->id,
                    'name' => $tech,
                ]);
            }
        }
    }
}

