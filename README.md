# Before start
```
cd laravel/
composer install
composer update
cp .env.example .env
php artisan key:generate
```

# Make the following changes in the `LARAVEL` .env:
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=customAIze
DB_USERNAME=root
DB_PASSWORD=rootpwd

APP_URL=http://localhost
SANCTUM_STATEFUL_DOMAINS=http://localhost:8080,http://127.0.0.1:8080,http://localhost:3000,http://127.0.0.1:3000

PICANOVA_API_KEY=1234
DALL_E_API_KEY=1234
BIGJPG_API_KEY=1234
GOOGLE_TAG_MANAGER=1234

FASTAPI_USER=someuser
FASTAPI_PASSWORD=somepassword
FASTAPI_URL=http://fastapi:8003
```

# Go to the `React` folder:
```
cd react/
cp .env.example .env
```

# Go to the `fastapi` folder:
```
cd fastapi/
cd app/
cp .env.example .env
```

# Starting the services:
```
docker-compose up --build
```

# 👀Public shop developers should also:
```
cd laravel/
npm install
npm run dev
```

# If migrations on laravel are not working:
Open the mysql shell, paste this:
```
mysql -u root -p
```
And paste this:
```
SET GLOBAL log_bin_trust_function_creators = 1;
```

# Seed the database:
In the laravel shell:
```diff
- php artisan migrate:fresh --seed
+ php artisan db:seed --class=DatabaseSeeder
```

# URLs

**Backoffice**
```
http://localhost:3000/
```
**Public Shop**
```
http://localhost:8000/
```
**PHPMyAdmin**
```
http://localhost:8080/
```
**FastAPI**
```
http://localhost:8003/docs/
```
**Prometheus**
```
http://localhost:9090/
```
**Grafana**
```
http://localhost:4000/
```
