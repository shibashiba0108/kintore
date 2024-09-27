import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],

    server: {
        host: '0.0.0.0',  // Dockerコンテナ外からアクセスできるようにする
        port: 5173,        // Viteのデフォルトポート
        hmr: {
            host: 'localhost',  // ホットリロード用にホストを設定
        },
    },
});
