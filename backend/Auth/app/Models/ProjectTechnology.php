<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTechnology extends Model
{
    use HasFactory;

    protected $fillable = ['portfolio_project_id', 'name'];

    public function portfolioProject()
    {
        return $this->belongsTo(PortfolioProject::class);
    }
}
