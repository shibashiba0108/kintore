<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Performance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    // 管理者ログイン画面の表示
    public function login()
    {
        return Inertia::render('Admin/AdminLogin');
    }

    // ログイン認証処理
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    // 管理者ダッシュボード
    public function dashboard()
    {
        $users = User::select('id', 'name', 'email')->limit(5)->get();
        return Inertia::render('Admin/AdminDashboard', [
            'users' => $users,
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return back()->with('success', 'ユーザーが削除されました。');
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    // ユーザー詳細とトレーニング履歴
    public function userDetail($id)
    {
        $trainingHistory = Performance::where('user_id', $id)
            ->with('exercise')
            ->orderBy('pfmc_date', 'desc')
            ->get();

        return Inertia::render('Admin/AdminUserDetail', [
            'userId' => $id,
            'trainingHistory' => $trainingHistory,
        ]);
    }

    // トレーニング履歴の削除
    public function deletePerformance($id)
    {
        $performance = Performance::findOrFail($id);
        $performance->delete();  // データベースから物理削除
        // または論理削除の場合:
        // $performance->delete_flg = 1;
        // $performance->save();

        return back()->with('success', 'トレーニング履歴が削除されました。');
    }
}