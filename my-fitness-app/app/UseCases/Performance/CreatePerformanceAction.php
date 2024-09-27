<?php

namespace App\Usecases\Performance;

use App\Models\Performance;

class CreatePerformanceAction
{
    public function execute(array $validatedData, $userId)
    {
        // 新しいトレーニング記録を作成
        Performance::create([
            'user_id' => $userId,
            'excs_id' => $validatedData['excs_id'],
            'weight_count' => $validatedData['weight'],
            'rep_count' => $validatedData['reps'],
            'set_count' => $validatedData['sets'],
            'duration' => $validatedData['duration'],
            'pfmc_date' => $validatedData['date'],
        ]);
    }
}