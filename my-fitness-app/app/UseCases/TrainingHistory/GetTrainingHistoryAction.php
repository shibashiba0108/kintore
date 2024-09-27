<?php

namespace App\Usecases\TrainingHistory;

use App\Models\Performance;

class GetTrainingHistoryAction
{
    public function execute($userId)
    {
        // パフォーマンスデータを取得し、エクササイズ情報をリレーションで取得
        $allDataArr = Performance::where('user_id', $userId)
            ->with('exercise') // リレーションでエクササイズ情報を含める
            ->orderBy('pfmc_date', 'desc')
            ->get()
            ->groupBy('pfmc_date');

        // 直近5日分のデータ
        $recentData = $allDataArr->take(5);

        // それ以降のデータ
        $olderData = $allDataArr->skip(5)->take(5);

        // 月別サマリー
        $monthlySummary = Performance::selectRaw('DATE_FORMAT(pfmc_date, "%Y-%m") as month, COUNT(*) as count')
            ->where('user_id', $userId)
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->get();

        return [
            'recentData' => $recentData,
            'olderData' => $olderData,
            'monthlySummary' => $monthlySummary
        ];
    }
}