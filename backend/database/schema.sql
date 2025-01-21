-- Create database if not exists
CREATE DATABASE IF NOT EXISTS testsalon;
USE testsalon;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(191) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fname VARCHAR(100),
    lname VARCHAR(100),
    role VARCHAR(50) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profesional (
    id SERIAL PRIMARY KEY,
    email VARCHAR(191) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fname VARCHAR(100),
    lname VARCHAR(100),
    phone VARCHAR(20),
    image VARCHAR(255),
    role VARCHAR(50) DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    servicename VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration INTEGER,
    serviceImage VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    customerId INTEGER NOT NULL,
    serviceId INTEGER NOT NULL,
    professionalId INTEGER NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES users(id),
    FOREIGN KEY (serviceId) REFERENCES services(id),
    FOREIGN KEY (professionalId) REFERENCES profesional(id)
);

-- Insert admin user if not exists
INSERT INTO users (email, password, fname, lname, role) 
VALUES ('admin@salon.com', 'admin123', 'Admin', 'User', 'admin')
ON CONFLICT (email) DO NOTHING;
