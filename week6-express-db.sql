CREATE DATABASE `week6-express-db`;
USE `week6-express-db`;

CREATE TABLE obat(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama varchar(30),
    jenis_kelamin enum('P', 'L'),
    tgl_lahir date,
    penyakit varchar(50),
    tgl_lahir date
);

CREATE TABLE users(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(110) UNIQUE,
    password varchar(255)
);