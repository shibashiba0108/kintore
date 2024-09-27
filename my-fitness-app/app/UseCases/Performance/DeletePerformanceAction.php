<?php

namespace App\Usecases\Performance;

use App\Models\Performance;
use Exception;

class DeletePerformanceAction
{
    public function execute($id)
    {
        try {
            // パフォーマンス記録の削除処理
            $performance = Performance::findOrFail($id);
            $performance->delete();
        } catch (Exception $e) {
            // 例外が発生した場合は 500 エラーを返す
            abort(500, 'パフォーマンス記録の削除に失敗しました。');
        }
    }
}