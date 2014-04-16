## Requirements

    * Php5.4+ (php5.5 is recommended)
    * Mysql or postgreSQL
    * NodeJS latest stable version with NPM

## Installation
```
# run as root!
apt-get update -y
apt-get upgrade -y
apt-get install sudo -y

# Install vim and set as default editor
sudo apt-get install -y vim
sudo update-alternatives --set editor /usr/bin/vim.basic

# Install Git
sudo apt-get install -y git-core

# Make sure Git is version 1.7.10 or higher, for example 1.7.12 or 1.8.4
git --version

# Cloning
git clone git@github.com:grena/project-mauna.git -b develop

cd project-mauna

# Install base libraries
sudo type node >/dev/null 2>&1 || { echo >&2 "Vous avez besoin de nodeJS"; exit(0);} && npm install -g bower
sudo type composer >/dev/null 2>&1 || { echo >&2 "Vous avez besoin de composer"; exit(0);} && composer install -o

npm i && bower install

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
