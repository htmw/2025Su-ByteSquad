-- Create database if not exists
CREATE DATABASE IF NOT EXISTS gym;

-- Create user if not exists
CREATE USER IF NOT EXISTS 'gym'@'localhost' IDENTIFIED BY 'gym1234';

-- Grant privileges
GRANT ALL PRIVILEGES ON gym.* TO 'gym'@'localhost';
FLUSH PRIVILEGES;

-- Use the database
USE gym;

-- Create supplement table if not exists
CREATE TABLE IF NOT EXISTS supplement (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(100),
    brand VARCHAR(100),
    usage TEXT,
    benefits TEXT
);
