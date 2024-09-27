<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BodyPart extends Model
{
    use HasFactory;

    protected $table = 'body_part'; // テーブル名を指定

    protected $fillable = [
        'bdp_name',
    ];

    /**
     * Exerciseへのリレーションを定義
     */
    public function exercises()
    {
        return $this->hasMany(Exercise::class, 'bdp_id');
    }
}
