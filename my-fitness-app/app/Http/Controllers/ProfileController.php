<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UserProfileRequest; 
use App\Http\Requests\UserFitnessGoalRequest; 
use App\Usecases\Trainings\CreateProfileAction;
use App\Usecases\Trainings\SetFitnessGoalAction;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    protected $createProfileAction;
    protected $setFitnessGoalAction;

    public function __construct(CreateProfileAction $createProfileAction, SetFitnessGoalAction $setFitnessGoalAction)
    {
        $this->createProfileAction = $createProfileAction;
        $this->setFitnessGoalAction = $setFitnessGoalAction;
    }

    /**
     * Display the user's profile form (edit).
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => $request->user()->profile,
            'currentGoalDetails' => $request->user()->profile,
        ]);
    }

    /**
     * Create a new user profile.
     */
    public function create(UserProfileRequest $request): RedirectResponse
    {
        // Usecaseを使ってプロフィール作成
        $this->createProfileAction->execute($request->validated(), Auth::id());

        return Redirect::route('profile.edit')->with('success', 'プロフィールが作成されました');
    }

    public function setFitnessGoal(UserFitnessGoalRequest $request)
    {
        // Usecase を使ってフィットネスゴールを設定
        $this->setFitnessGoalAction->execute($request->validated(), Auth::id());

        return Redirect::route('profile.edit')->with('success', 'フィットネスゴールが設定されました');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('success', 'プロフィールが更新されました');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
