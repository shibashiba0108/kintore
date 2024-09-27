<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $table = 'exercise';

    protected $fillable = [
        'excs_name',
        'bdp_id',
    ];

    public $timestamps = false;

    public function bodyPart()
    {
        return $this->belongsTo(BodyPart::class, 'bdp_id');
    }

    public function performances()
    {
        return $this->hasMany(Performance::class, 'excs_id');
    }
}