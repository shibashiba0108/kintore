import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreateProfile from "./Partials/CreateProfile";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";
import FitnessGoalForm from "./Partials/FitnessGoalForm"; // 新しくインポート
import { Head } from "@inertiajs/react";
import "../../../css/edit.css"; 

export default function Edit({ auth, mustVerifyEmail, status, currentGoalDetails }) {
    const [showCreateProfile, setShowCreateProfile] = useState(false);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(false);
    const [showFitnessGoal, setShowFitnessGoal] = useState(false); // フィットネスゴールの状態管理

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    プロフィール
                </h2>
            }
        >
            <Head title="プロフィール" />

            <div className="container">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Create Profile Form */}
                    <div className="form-section">
                        <button
                            onClick={() =>
                                setShowCreateProfile(!showCreateProfile)
                            }
                        >
                            {showCreateProfile
                                ? "プロフィール作成フォームを非表示"
                                : "プロフィール作成フォームを表示"}
                        </button>
                        {showCreateProfile && (
                            <CreateProfile className="max-w-xl" />
                        )}
                    </div>

                    {/* Update Profile Form */}
                    <div className="form-section">
                        <button
                            onClick={() =>
                                setShowUpdateProfile(!showUpdateProfile)
                            }
                        >
                            {showUpdateProfile
                                ? "プロフィール更新フォームを非表示"
                                : "プロフィール更新フォームを表示"}
                        </button>
                        {showUpdateProfile && (
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        )}
                    </div>

                    {/* Update Password Form */}
                    <div className="form-section">
                        <button
                            onClick={() =>
                                setShowUpdatePassword(!showUpdatePassword)
                            }
                        >
                            {showUpdatePassword
                                ? "パスワード更新フォームを非表示"
                                : "パスワード更新フォームを表示"}
                        </button>
                        {showUpdatePassword && (
                            <UpdatePasswordForm className="max-w-xl" />
                        )}
                    </div>

                    {/* Delete User Form */}
                    <div className="form-section">
                        <button
                            onClick={() => setShowDeleteUser(!showDeleteUser)}
                        >
                            {showDeleteUser
                                ? "アカウント削除フォームを非表示"
                                : "アカウント削除フォームを表示"}
                        </button>
                        {showDeleteUser && (
                            <DeleteUserForm className="max-w-xl" />
                        )}
                    </div>

                    {/* Fitness Goal Form (新しいフォーム) */}
                    <div className="form-section">
                        <button
                            onClick={() => setShowFitnessGoal(!showFitnessGoal)}
                        >
                            {showFitnessGoal
                                ? "フィットネスゴール設定フォームを非表示"
                                : "フィットネスゴール設定フォームを表示"}
                        </button>
                        {showFitnessGoal && (
                            <FitnessGoalForm
                                className="max-w-xl"
                                currentGoalDetails={currentGoalDetails}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
