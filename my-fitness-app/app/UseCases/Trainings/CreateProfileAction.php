<?php

namespace App\Usecases\Trainings;

use App\Models\User;
use Illuminate\Http\UploadedFile;

class CreateProfileAction
{
    public function execute(array $data, int $userId): void
    {
        $user = User::findOrFail($userId);

        // プロフィール画像があるか確認
        if (isset($data['profile_image']) && $data['profile_image'] instanceof UploadedFile) {
            $file = $data['profile_image'];
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('profile', $fileName, 'public'); // storage/app/public/profile に保存

            // ファイルパスをデータに追加
            $data['profile_image'] = '/storage/' . $filePath;
        }

        // プロフィールが既に存在する場合は更新、存在しない場合は新規作成
        $user->profile()->updateOrCreate(
            ['user_id' => $userId], // 条件
            $data // 更新または作成するデータ
        );
    }
}