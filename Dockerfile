FROM php:8.2-fpm-alpine AS base

RUN apk add --no-cache \
    nginx \
    libpng-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    supervisor \
    nodejs \
    npm

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd intl
RUN apk add --no-cache pcre-dev $PHPIZE_DEPS \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del pcre-dev $PHPIZE_DEPS

FROM base AS builder
WORKDIR /app
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock package*.json ./
RUN composer install --no-dev --ignore-platform-reqs --no-scripts
RUN npm install

COPY . .
RUN npm run build

FROM base AS final
WORKDIR /var/www/html

COPY --from=builder /app /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisord.conf
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
