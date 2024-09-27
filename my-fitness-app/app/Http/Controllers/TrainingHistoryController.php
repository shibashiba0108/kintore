<?php

namespace App\Http\Controllers;

use App\Models\Performance;
use App\Usecases\TrainingHistory\GetTrainingHistoryAction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrainingHistoryController extends Controller
{
    protected $getTrainingHistoryAction;

    public function __construct(GetTrainingHistoryAction $getTrainingHistoryAction)
    {
        $this->getTrainingHistoryAction = $getTrainingHistoryAction;
    }

    // トレーニング履歴の表示
    public function index()
    {
        // ユーザーIDを取得
        $userId = Auth::id();
        
        // ロジックはアクション内で処理
        $data = $this->getTrainingHistoryAction->execute($userId);
        
        // Inertia.jsでビューを表示
        return Inertia::render('TrainingHistory/TrainingHistory', $data);
    }

    // トレーニング記録の削除
    public function destroy($id)
    {
        // 削除処理はアクションに委譲せず、ここで行う
        Performance::findOrFail($id)->delete();

        // リダイレクト処理のみ
        return redirect()->route('training_history.index')->with('success', 'トレーニング記録が削除されました。');
    }
}