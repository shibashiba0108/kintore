<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\PerformanceController;
use App\Http\Controllers\TrainingHistoryController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index']);

Route::middleware(['auth', 'verified'])->get('/dashboard', [HomeController::class, 'mypage'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/create', [ProfileController::class, 'create'])->name('profile.create');
    Route::post('/profile/fitness-goal', [ProfileController::class, 'setFitnessGoal'])->name('profile.setFitnessGoal');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // エクササイズ関連ルート
    Route::resource('exercises', ExerciseController::class);
    Route::get('/exercises/{id}', [ExerciseController::class, 'show'])->name('exercises.show');

    // パフォーマンス関連ルート
    Route::get('/performance', [PerformanceController::class, 'index'])->name('performance.index'); // パフォーマンス表示
    Route::post('/performance/create', [PerformanceController::class, 'create'])->name('performance.create');
    Route::delete('/performance/{id}', [PerformanceController::class, 'destroy'])->name('performance.destroy'); // パフォーマンス削除

    // トレーニング履歴関連ルート
    Route::get('/training_history', [TrainingHistoryController::class, 'index'])->name('training_history.index');
    Route::delete('/training_history/{id}', [TrainingHistoryController::class, 'destroy'])->name('training_history.destroy');
});

Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminController::class, 'login'])->name('admin.login');
    Route::post('/login', [AdminController::class, 'authenticate']);  // ログイン認証用
    Route::middleware('auth:admin')->group(function () {  // 管理者用の認証ミドルウェア
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::delete('admin/user/{id}', [AdminController::class, 'deleteUser'])->name('admin.user.delete');
        Route::post('admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
        Route::get('user/{id}', [AdminController::class, 'userDetail'])->name('admin.user.detail');
        Route::delete('admin/performance/{id}', [AdminController::class, 'deletePerformance'])->name('admin.performance.delete');
    });
});

require __DIR__.'/auth.php';