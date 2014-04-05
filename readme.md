# The Mauna Project.

## Installation

#### Global
```
git clone https://github.com/grena/project-mauna.git && cd project-mauna
composer install
npm install
bower install
```

#### Database


```
cp app/config/database.php app/config/local/database.php # Now edit this file to match your local config
php artisan migrate
php artisan db:seed
```

#### Run server

Run the server with `php artisan serve` and go to http://localhost:8000/#/login. Log informations :

- email : **user@example.com**
- pass : **user**