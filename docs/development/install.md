# Requirements

- Php5.4+ (php5.5 is recommended)
- Mysql or PostgreSQL
- NodeJS latest stable version with NPM
- Composer
- Bower

# Installation

**Clone repo from github**
```
git clone git@github.com:grena/project-mauna.git -b develop
```

**Install external libs**
```
cd project-mauna
npm i && bower install
composer install
```

**Database Setup**

Don't forget to create the database for the project (MySQL or PostgreSQL), then :
```
mkdir -p app/config/local
cp app/config/database.php app/config/local/database.php
```
Then edit you `app/config/local/database.php` to match your database credentials.

**Run migration**
```
php artisan migrate --seed
```
