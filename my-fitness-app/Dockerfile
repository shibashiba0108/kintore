# ベースイメージ
FROM php:8.2-fpm

# 作業ディレクトリ
WORKDIR /var/www

# 必要なPHP拡張とライブラリをインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev

# Node.jsのインストール (LTSバージョン)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# PHPの依存パッケージをインストール
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリにLaravelをコピー
COPY . /var/www

# 権限設定
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

# ポートの公開
EXPOSE 9000

# 起動時のコマンド
CMD ["php-fpm"]
