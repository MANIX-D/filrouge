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
            $table->string('title')->nullable();
            $table->string('location')->nullable();
            $table->float('rating')->default(0);
            $table->integer('review_count')->default(0);
            $table->integer('projects_completed')->default(0);
            $table->date('member_since')->default(now());
            $table->decimal('daily_rate', 10, 2)->nullable();
            $table->text('about')->nullable();
            $table->boolean('is_available')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'title', 'location', 'rating', 'review_count', 'projects_completed',
                'member_since', 'daily_rate', 'about', 'is_available'
            ]);
        });
    }
};
