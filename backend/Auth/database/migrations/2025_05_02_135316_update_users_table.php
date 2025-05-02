<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Champs profil freelance
            $table->string('professional_title')->nullable()->after('email');
            $table->text('bio')->nullable()->after('professional_title');
            $table->string('profile_picture')->nullable()->after('bio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'user_type',
                'professional_title',
                'bio',
                'profile_picture'
            ]);
        });
    }
};
