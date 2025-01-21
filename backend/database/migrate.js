const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: 'postgresql://postgres:maBHXwkredQDhIAkMtOxIwpnzmfnWofX@junction.proxy.rlwy.net:24937/railway',
    ssl: {
        rejectUnauthorized: false
    }
});

const queries = [
    `CREATE TABLE IF NOT EXISTS profesional (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(191) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        image VARCHAR(255),
        role VARCHAR(50) DEFAULT 'employee',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        duration INTEGER,
        serviceImage VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(191) NOT NULL,
        customer_phone VARCHAR(20),
        service_id INTEGER,
        profesional_id INTEGER,
        appointment_date TIMESTAMP NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (service_id) REFERENCES services(id),
        FOREIGN KEY (profesional_id) REFERENCES profesional(id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(191) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `INSERT INTO users (name, email, password, role) 
    VALUES ('Admin', 'admin@salon.com', 'admin123', 'admin')
    ON CONFLICT (email) DO NOTHING`
];

async function migrate() {
    try {
        for (const query of queries) {
            await pool.query(query);
            console.log('Query executed successfully');
        }
        console.log('Migration completed successfully');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await pool.end();
    }
}

migrate();
