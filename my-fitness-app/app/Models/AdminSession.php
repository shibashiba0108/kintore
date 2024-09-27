<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Admin;

class AdminSession extends Model
{
    use HasFactory;

    protected $table = 'admin_sessions';
    protected $dates = ['expires_at'];

    protected $fillable = [
        'session_id',
        'admin_id',
        'admin_role',
        'expires_at',
    ];

    /**
     * Adminとのリレーション
     */
    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}
