import React from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function TrainingHistory() {
    const {
        auth,
        recentData = [],
        olderData = [],
        monthlySummary = [],
        currentPage,
        totalPages,
    } = usePage().props;
    const user = auth ? auth.user : null;

    const handleDelete = (id) => {
        if (confirm("この記録を削除してもよろしいですか？")) {
            Inertia.delete(route("training_history.destroy", id), {
                onSuccess: () => {
                    alert("トレーニング記録が削除されました。");
                },
            });
        }
    };

    const handleToggleDetails = (date) => {
        const details = document.getElementById(`details-${date}`);
        details.style.display =
            details.style.display === "none" || details.style.display === ""
                ? "flex"
                : "none";
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    トレーニング履歴
                </h2>
            }
        >
            <div className="container mx-auto py-8 px-4">
                {/* 直近5日のトレーニング */}
                <h3 className="section-title">直近5日のトレーニング</h3>
                {Object.keys(recentData).length > 0 ? (
                    <div
                        id="daily_excs_list"
                        className="grid grid-cols-1 gap-6"
                    >
                        {Object.keys(recentData).map((date) => (
                            <div
                                key={date}
                                className="training-day bg-white p-4 shadow rounded-lg"
                            >
                                <h4 className="text-lg font-bold text-red-500">
                                    {date}
                                </h4>
                                <div className="day_container flex flex-wrap gap-4">
                                    {recentData[date].map((record) => (
                                        <div
                                            key={record.id}
                                            className="exercise bg-gray-100 p-2 rounded-lg shadow-md w-64"
                                        >
                                            <ul>
                                                <li className="name font-semibold">
                                                    {record.exercise.excs_name}
                                                </li>
                                                <li>
                                                    {record.weight_count} kg
                                                </li>
                                                <li>{record.rep_count} 回</li>
                                                <li>
                                                    {record.set_count} セット
                                                </li>
                                                <li>{record.duration} 分</li>
                                                <li>
                                                    <button
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                                        onClick={() =>
                                                            handleDelete(
                                                                record.id
                                                            )
                                                        }
                                                    >
                                                        削除
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty">まだトレーニングをしていません</p>
                )}

                {/* 以前のトレーニング */}
                <h3 className="section-title mt-8">以前のトレーニング</h3>
                {Object.keys(olderData).length > 0 ? (
                    <div
                        id="older_excs_list"
                        className="grid grid-cols-1 gap-6"
                    >
                        {Object.keys(olderData).map((date) => (
                            <div
                                key={date}
                                className="training-older-day bg-white p-4 shadow rounded-lg"
                            >
                                <h4 className="text-lg font-bold">{date}</h4>
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => handleToggleDetails(date)}
                                >
                                    詳細を見る
                                </button>
                                <div
                                    id={`details-${date}`}
                                    className="day_container flex flex-wrap gap-4"
                                    style={{ display: "none" }}
                                >
                                    {olderData[date].map((record) => (
                                        <div
                                            key={record.id}
                                            className="exercise bg-gray-100 p-2 rounded-lg shadow-md w-64"
                                        >
                                            <ul>
                                                <li className="name font-semibold">
                                                    {record.exercise.excs_name}
                                                </li>
                                                <li>
                                                    {record.weight_count} kg
                                                </li>
                                                <li>{record.rep_count} 回</li>
                                                <li>
                                                    {record.set_count} セット
                                                </li>
                                                <li>{record.duration} 分</li>
                                                <li>
                                                    <button
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                                        onClick={() =>
                                                            handleDelete(
                                                                record.id
                                                            )
                                                        }
                                                    >
                                                        削除
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>以前のトレーニングはありません。</p>
                )}

                {/* ページネーション */}
                <div className="pagination mt-8">
                    {currentPage > 1 && (
                        <a href={`?page=${currentPage - 1}`}>&laquo; 前へ</a>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <a
                            key={index + 1}
                            href={`?page=${index + 1}`}
                            className={
                                currentPage === index + 1 ? "active" : ""
                            }
                        >
                            {index + 1}
                        </a>
                    ))}
                    {currentPage < totalPages && (
                        <a href={`?page=${currentPage + 1}`}>次へ &raquo;</a>
                    )}
                </div>

                {/* 月別トレーニングサマリー */}
                <h3 className="section-title mt-8">月別トレーニングサマリー</h3>
                <div id="monthly_summary" className="monthly-summary">
                    {monthlySummary.map((summary) => (
                        <p key={summary.month}>
                            {summary.month}: {summary.count}{" "}
                            日トレーニングしました
                        </p>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}