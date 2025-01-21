const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:maBHXwkredQDhIAkMtOxIwpnzmfnWofX@junction.proxy.rlwy.net:24937/railway';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

// Проверка подключения
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Successfully connected to database');
        release();
    }
});

module.exports = pool;
