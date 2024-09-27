<?php

namespace App\Usecases\User;

use App\Models\User;
use Illuminate\Support\Carbon;

class GetRecentRegistrationsAction
{
    public function execute()
    {
        return User::where('created_at', '>=', Carbon::now()->subDays(7))->count();
    }
}
