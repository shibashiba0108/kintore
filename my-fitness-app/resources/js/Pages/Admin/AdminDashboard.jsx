import { Link, useForm } from '@inertiajs/react';

export default function AdminDashboard({ users }) {
    const { delete: destroy, post } = useForm(); // Inertiaの削除メソッドを利用

    // ユーザー削除機能
    const handleDelete = (userId) => {
        if (confirm('このユーザーを削除してもよろしいですか？')) {
            destroy(route('admin.user.delete', userId)); // 削除リクエストを送信
        }
    };

    // ログアウト機能
    const handleLogout = () => {
        post(route('admin.logout'), {}, {
            onSuccess: () => {
                // 成功した場合にログインページにリダイレクト
                window.location.href = route('admin.login');
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-6xl p-8 space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900 text-center">ユーザー管理</h1>
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
                    >
                        ログアウト
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ユーザー名
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    アクション
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-4">
                                        <Link
                                            href={route('admin.user.detail', user.id)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            詳細
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            削除
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}