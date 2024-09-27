<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGoal extends Model
{
    use HasFactory;

    protected $table = 'user_goals';

    // 複数代入可能な属性
    protected $fillable = [
        'user_id',
        'fitness_goal_id',
        'target_weight',
        'target_date',
        'exercise_name',
        'exercise_weight',
    ];

    /**
     * ユーザーとのリレーション
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * フィットネスゴールとのリレーション
     */
    public function fitnessGoal()
    {
        return $this->belongsTo(FitnessGoal::class, 'fitness_goal_id');
    }
}