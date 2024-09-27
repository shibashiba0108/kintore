<?php

namespace App\Usecases\Performance;

use App\Models\Performance;

class GetTodayPerformanceAction
{
    public function execute($userId)
    {
        // 今日のトレーニングデータを取得し、エクササイズ名をリレーションで取得
        return Performance::where('user_id', $userId)
            ->whereDate('pfmc_date', now())
            ->with('exercise') // exerciseテーブルとのリレーション
            ->get();
    }
}