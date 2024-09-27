import { Link, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "../../css/index.css";

export default function Welcome({ auth, recentRegistrationsCount }) {
    // フッターの開閉を制御するReactの状態を設定
    const [isFormOpen, setIsFormOpen] = useState(false);

    // フォームのトグル関数
    const toggleContactForm = () => {
        setIsFormOpen(!isFormOpen); // フォームの開閉をトグル
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const slides = [
        {
            image: "/images/240_F_794521954_8yoTeKTg3iPmJi4AlqT9lWMm5zV8uN50.jpg",
            text: "トレーニング記録の管理",
        },
        {
            image: "/images/240_F_542866609_ogTaVwUDbjNW7jqojeZvMUoBcA4TBiQH.jpg",
            text: "理想の体を手に入れるために",
        },
        {
            image: "/images/240_F_740423389_XqnGtfMo9BJImRQVyIdYXeft7AEM2IGu.jpg",
            text: "さあ、トレーニングを始めよう",
        },
    ];

    // スライダーの自動切り替え
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // 5秒ごとにスライドが切り替わる
        return () => clearInterval(interval);
    }, [slides.length]);

    // ポップアップの表示・非表示の制御
    useEffect(() => {
        const popup = document.getElementById("statsPopup");
        const closePopupButton = document.getElementById("closePopup");

        if (popup) {
            popup.style.display = "block";
            setTimeout(() => {
                popup.style.display = "none";
            }, 10000); // 10秒後に非表示
        }

        if (closePopupButton) {
            closePopupButton.addEventListener("click", () => {
                popup.style.display = "none";
            });
        }
    }, []);

    // ハンバーガーメニューのトグル
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <Head title="トップページ" />

            {/* ヘッダー */}
            <header className="header">
                <div id="hamburger" className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>
                <div className="title">Kintrail</div>
                <div className={`menu ${menuOpen ? "open" : ""}`} id="menu">
                    <Link href={route("admin.login")} className="nav-link">
                        管理者ログイン
                    </Link>
                </div>
            </header>

            {/* メインコンテンツ */}
            <div className="content">
                {/* スライダー */}
                <div className="slider">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide ${
                                index === currentSlide ? "active" : ""
                            }`}
                            style={{
                                display:
                                    index === currentSlide ? "block" : "none",
                                opacity: index === currentSlide ? 1 : 0,
                            }}
                        >
                            <img
                                src={slide.image}
                                alt={`Slide ${index}`}
                                className="slide-image"
                            />
                            <div className="slide-text">
                                <h3>{slide.text}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="auth-links">
                    <Link href={route("login")} className="auth-link">
                        ログイン
                    </Link>
                    <Link href={route("register")} className="auth-link">
                        新規登録
                    </Link>
                </div>
                {/* 登録数のポップアップ */}
                <div id="statsPopup" className="popup">
                    <p>
                        過去7日間で {recentRegistrationsCount}{" "}
                        人の登録がありました
                    </p>
                    <button id="closePopup">✖</button>
                </div>
            </div>

            <footer
                className={`footer bg-white p-4 ${isFormOpen ? "open" : ""}`}
            >
                <div className="flex justify-center">
                    <button
                        id="contactButton"
                        onClick={toggleContactForm}
                        className="mb-4 p-2 bg-blue-500 text-white rounded"
                    >
                        お問い合わせ
                    </button>
                </div>
                {isFormOpen && (
                    <form
                        action="contact.php"
                        method="POST"
                        id="contactForm"
                        className="mb-4"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="お名前"
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="メールアドレス"
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="お問い合わせ内容"
                            rows="5"
                            className="border p-2 mb-2 w-full"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="p-2 bg-green-500 text-white rounded"
                        >
                            送信
                        </button>
                    </form>
                )}
                <p className="text-center">
                    &copy; 2024 Kintrail. All rights reserved.
                </p>
            </footer>
        </>
    );
}
