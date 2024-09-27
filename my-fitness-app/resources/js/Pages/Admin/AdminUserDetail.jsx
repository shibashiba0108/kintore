import { Link, useForm } from '@inertiajs/react';

export default function AdminUserDetail({ userId, trainingHistory }) {
    const { delete: destroy } = useForm(); // useFormのdeleteメソッドを使用

    const handleDelete = (performanceId) => {
        console.log(`Deleting performance with ID: ${performanceId}`);
        destroy(route('admin.performance.delete', performanceId), {
            onSuccess: () => {
                console.log("Deleted successfully");
                // 削除後の画面更新など
            },
            onError: (errors) => {
                console.error("Error occurred:", errors);
            }
        });
    };        

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-6xl p-8 space-y-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                    ユーザーID: {userId} のトレーニング履歴
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    種目名
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    重量
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    回数
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    セット数
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    時間
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    日付
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    アクション
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {trainingHistory.map((performance) => (
                                <tr key={performance.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.exercise.excs_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.weight_count} kg</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.rep_count} 回</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.set_count} セット</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.duration} 分</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.pfmc_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDelete(performance.id)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            削除
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6">
                    <Link
                        href={route('admin.dashboard')}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                        前へ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}