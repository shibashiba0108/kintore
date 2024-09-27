<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Exercise;

class Performance extends Model
{
    use HasFactory;

    protected $table = 'performance'; 

    protected $fillable = [
        'user_id',
        'excs_id',
        'weight_count',
        'set_count',
        'rep_count',
        'duration',
        'pfmc_date',
        'delete_flg',
    ];

    /**
     * ユーザーとのリレーション
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Exerciseとのリレーション
     */
    public function exercise()
    {
        return $this->belongsTo(Exercise::class, 'excs_id');
    }
}