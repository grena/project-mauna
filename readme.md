# The Mauna Project.

## Installation

#### Requirement
```
- Php5.4+ (php5.5 is recommended)
- Mysql or postgreSQL
- NodeJS latest stable version with NPM
- Bower (nodeJS package)
```
#### Global
```
# Cloning
git clone git@github.com:grena/project-mauna.git && cd project-mauna

# Install base libraries
npm i && bower install && composer install

# Database Setup

# Secure your installation
sudo mysql_secure_installation

# Login to MySql
mysql -u root -p

# Create mauna user
# Change $password with a good password
mysql> CREATE USER 'mauna'@'localhost' IDENTIFIED BY '$password';

# Ensure you can use InnoDB
mysql> SET storage_engine=INNODB;

# Create the mauna production database
mysql> CREATE DATABASE IF NOT EXISTS `mauna` DEFAULT CHARACTER SET `utf8` COLLATE `utf8_unicode_ci`;

# Grant the mauna user necessary permissions on the table.
mysql> GRANT SELECT, LOCK TABLES, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER ON `mauna`.* TO 'mauna'@'localhost';

# Quit the database session
mysql> \q

# Create and edit config files
cp app/config/database.php app/config/local/database.php && editor app/config/local/database.php

# Run migration
php artisan migrate:install && php artisan migrate --seed
```

#### Run server

Run the server with `php artisan serve` and go to http://localhost:8000/#/login. Log informations :

- email : **user@example.com**
- pass : **user**
