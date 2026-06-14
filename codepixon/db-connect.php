<?php

$host = 'localhost';
$dbname = 'pixelplayground';
$username = 'root';
$password = ''; 

try {
    // Connect to MySQL server first (without database name) to ensure the database itself exists
    $tempPdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $tempPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $tempPdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
} catch (PDOException $e) {
    die("Database creation/access failed: " . $e->getMessage());
}

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create users table if it doesn't exist yet
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS `users` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(50) NOT NULL UNIQUE,
            `password` VARCHAR(255) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    $pdo->exec($createTableSQL);
    
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>