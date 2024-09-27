<?php

namespace App\Http\Controllers;

use App\Models\Performance;
use App\Http\Requests\PerformanceRequest;
use App\Usecases\Performance\GetTodayPerformanceAction;
use App\Usecases\Performance\CreatePerformanceAction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PerformanceController extends Controller
{
    protected $getTodayPerformanceAction;
    protected $createPerformanceAction;

    public function __construct(
        GetTodayPerformanceAction $getTodayPerformanceAction,
        CreatePerformanceAction $createPerformanceAction
    ) {
        $this->getTodayPerformanceAction = $getTodayPerformanceAction;
        $this->createPerformanceAction = $createPerformanceAction;
    }

    // 今日のトレーニング記録を表示
    public function index()
    {
        $performances = $this->getTodayPerformanceAction->execute(Auth::id());
        return Inertia::render('Performances/Performance', ['dataArr' => $performances]);
    }

    // トレーニング記録を作成
    public function create(PerformanceRequest $request)
    {
        // パフォーマンスデータを保存
        $this->createPerformanceAction->execute($request->validated(), Auth::id());

        // 成功した場合にInertiaのレスポンスを返す
        return redirect()->back()->with('success', 'トレーニングが記録されました。');
    }

    // トレーニング記録を削除
    public function destroy($id)
    {
        $performance = Performance::findOrFail($id);
        $performance->delete();

        return redirect()->route('performance.index')->with('success', 'トレーニング記録が削除されました。');
    }
}