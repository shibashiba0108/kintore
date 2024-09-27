<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FitnessGoal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'goal_type', 'target_weight', 'exercise_name', 'exercise_weight', 'target_date'
    ];

    // Userとのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
