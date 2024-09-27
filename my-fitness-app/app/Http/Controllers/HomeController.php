<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Carbon;
use App\Usecases\Dashboard\GetDashboardDataAction;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected $getDashboardDataAction;

    public function index()
    {
        $recentRegistrationsCount = User::where('created_at', '>=', Carbon::now()->subDays(7))->count();

        return inertia('Welcome', [
            'recentRegistrationsCount' => $recentRegistrationsCount,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function __construct(GetDashboardDataAction $getDashboardDataAction)
    {
        $this->getDashboardDataAction = $getDashboardDataAction;
    }

    public function mypage()
    {
        // アクションを呼び出してダッシュボードのデータを取得
        $dashboardData = $this->getDashboardDataAction->execute();

        return Inertia::render('Dashboard', $dashboardData);
    }
}